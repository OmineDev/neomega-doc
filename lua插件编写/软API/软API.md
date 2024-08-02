---
lang: zh-CN
title: 软API
description: 软API
---

# 软 API

出于一些原因，例如版本控制问题，跨进程问题，api 提供者并非底层框架而是框架内组件，
一些 api 没有被包装成函数形式以便调用

而是以软 api 形式供调用

在使用它们时，你可以把它理解为类似发往服务器的 json 请求的概念

事实上，使用跨插件 api when_called_by_api_named 创建的 api 同样也是一个跨进程的软 api

## HashedUserID

用户 Token 的哈希 (若没有 Token 此项为空，注意，可能随验证服务器密码改变而改变)

```lua
local hashed_user_id, found = coromega:soft_get("HashedUserID")
coromega:print("hashed_user_id", hashed_user_id)
```

## HashedServerCode

用户 服务器号 的哈希

```lua
local hashed_server_code, found = coromega:soft_get("HashedServerCode")
coromega:print("hashed_server_code", hashed_server_code)
```

## GetNameRecord

使用一个准确的名字请求与之关联的历史或者现在的名字

- in: {
  "current_name": string
  }

- out: {
  "history_names": string
  }

```lua
coromega:start_new(function ()
    local ret, err = coromega:call_other_plugin_api("GetNameRecord", {
        ["current_name"] = "FBot_cb7826",
    })
    coromega:print("ret: ", json.encode(ret))
    coromega:print("err: ", json.encode(err))
end)
```

## SearchForName

使用一个名字或名字内的片段，例如 使用 "40" 搜索出 "2401PT", 会搜索玩家的历史名字 (在 [改名记录] 组件中所记录的历史名字)

- in: {<br>
  "part_of_name": string,<br>
  "max_results": int // 最大返回数量<br>
  }

- out: {"possible_names": {<br>
  "current": string, // 当前名<br>
  "history": string // 历史名 (如果命中历史名)<br>
  }
  }

```lua
coromega:start_new(function ()
    local ret, err = coromega:call_other_plugin_api("SearchForName", {
        ["part_of_name"] = "401P",
        ["max_results"] = 4,
    })
    coromega:print("ret: ", json.encode(ret)) -- {"possible_names":[{"current":"2401PT","history":"2401PT"}]}
    coromega:print("err: ", json.encode(err))
end)
```

## 服务
服务可以通过 软API 调用  

### 为什么需要服务？
这里需要回答3个问题:
- 为什么不把服务对应的功能写在每个插件里？
- 为什么不将服务作为基础api?
- 为什么不将服务写成普通插件，然后通过软 api 暴露，而是必须抽取出服务这个概念？

首先，请考虑这么一个场景：  
有两个插件，一个是计分板同步，一个是排行榜显示，他们都需要周期性发送指令获取计分板数据。  


那么这两个插件都需要循环请求计分板数据吗？都需要保存计分板数据吗？  
当然不是，因为他俩的数据完全可以共用，只需要请求一次就可以，完全没必要把同样的事情做两次，给服务器带来双倍压力。

那么，为什么不作为框架的基础api呢？就像发送指令那样的api?  
如果是那样，无论是否有插件需要，omega都需要周期性发送指令请求计分板数据。  
然而，这与 omega 长期精心设计的api理念： 尽可能降低对服务器负担，如果不需要决不主动请求数据，相冲突。  
所以在不需要时，必不能对服务器产生负担，因此不能放在基础api中。

那么，为什么不作为普通插件，然后通过软 api 暴露，而是必须抽取出服务这个概念？   
如果这个 “前置” 插件是你自己编写的，那也不是不行。不过那样，使用的插件必须检查前置插件是否打开，这很麻烦不是吗？ 
另外，抽离成服务代表调用和api更简单，可以同时服务更多的插件，用户也不必先装前置插件再装插件，使用也变得简单。


### 启用服务

启用一个服务，当启用时，终端会显示 "I have control [服务名] [配置]"   
也可以在终端输入 "ctrld" (即 controlled-daemon) 查看现在已启用和未启用的服务   
多个插件可以同时启用同一个服务，但是服务只会被启用一次，后续的启用请求不会重新启用服务，而是更改服务的配置   
但是，服务的配置会被如何更改则是由服务本身确定的   

以下是一个启用服务的例子，对于每种服务具体参数和名称将在下文介绍
``` lua
coromega:start_new(function ()
    local actual_config,err=coromega:call_other_plugin_api("brain/enable",{
        name="player_eye",
        config={
            ["每秒请求次数"]=4,
        }
    },1)
    coromega:print(actual_config,err)
end)
```

其中，name 后的 "player_eye" 为服务名， config 后的内容为参数设置、更新    
返回参数为 服务实际使用的配置(例如，如果一个插件参数为4，另一个为8 其中肯定有一个参数和实际不符)和错误 
每种服务的服务名和参数选项位于下文   


### trajectory 机器人位置和轨迹
启用服务
``` lua 
coromega:start_new(function ()
  local actual_config,err=coromega:call_other_plugin_api("brain/enable",{
      name="trajectory"
  },1)
  coromega:print(actual_config,err)
end)
```

监听机器人位置变化事件
``` lua 
coromega:when_new_data_in_subscribed_topic_named("brain/trajectory/pos_update"):start_new(function (new_pos)
    coromega:print(new_pos.x,new_pos.y,new_pos.z)
    coromega:print(new_pos.dimension)
    coromega:print(os.date("%H:%M:%S",new_pos.unix_time))
end)
```

查询机器人历史位置
``` lua 
coromega:start_new(function ()
  local results,err= coromega:call_other_plugin_api("brain/trajectory/query_pos_records",{
      max=10,
  },1.0)
  coromega:print("历史位置记录(最大10条)",err)
  for i,result in pairs(results) do
      coromega:print(result.x,result.y,result.z)
      coromega:print(result.dimension)
      coromega:print(os.date("%H:%M:%S",result.unix_time))
  end 
end)
```

示例代码: 当机器人位置变化时显示新位置并查询历史位置
``` lua 
local omega = require("omega")
local json = require("json")
--- @type Coromega
local coromega = require("coromega").from(omega)

coromega:start_new(function ()
    local actual_config,err=coromega:call_other_plugin_api("brain/enable",{
        name="trajectory"
    },1)
    coromega:print(actual_config,err)
end)

coromega:when_new_data_in_subscribed_topic_named("brain/trajectory/pos_update"):start_new(function (new_pos)
    coromega:print(new_pos.x,new_pos.y,new_pos.z)
    coromega:print(new_pos.dimension)
    coromega:print(os.date("%H:%M:%S",new_pos.unix_time))

    local results,err= coromega:call_other_plugin_api("brain/trajectory/query_pos_records",{
        max=10,
    },1.0)
    coromega:print("历史位置记录(最大10条)",err)
    for i,result in pairs(results) do
        coromega:print(result.x,result.y,result.z)
        coromega:print(result.dimension)
        coromega:print(os.date("%H:%M:%S",result.unix_time))
    end 


end)

coromega:run()
```


### scoreboard 玩家计分板记录、查询、排行
启用服务
``` lua 
coromega:start_new(function ()
  local actual_config,err=coromega:call_other_plugin_api("brain/enable",{
      name="scoreboard",
      config={
          ["每次请求周期_秒"]=4,
      }
  },1)
  coromega:print(actual_config,err)
end)
```
计分板信息需要周期性查询，每次请求周期_秒 控制这个周期参数   

监听每次查询的结果  (若无人在计分板上，则无法监听到任何数据)
``` lua
coromega:when_new_data_in_subscribed_topic_named("brain/scoreboard/score_update"):start_new(function (data)
    -- 显示这次获取到的在线的所有人的所有计分板
    coromega:print("scores",data.scores)
    -- 显示计分板对应的显示名
    coromega:print("scoreboards",data.scoreboards)
    -- 显示相关玩家对应的 UUID
    coromega:print("players",data.players)
end)
```
 

使用 玩家 uuid 查询 玩家所有计分板分数，无论玩家是否在线
``` lua 
coromega:start_new(function ()
  local players = coromega:get_all_online_players()
  for _,player in pairs(players) do
      coromega:print(player:uuid_string())
      -- 查询每个在线人的所有计分板
      -- 这个 api 即使玩家不在线也可查询，只要知道 uid 即可
      local player_scores,err=coromega:call_other_plugin_api("brain/scoreboard/player_score_by_uid",{
          uid=player:uuid_string(),
      },1)
      -- 显示查询结果
      coromega:print(player:name(),"scores:",player_scores)
  end
end)
```

查询计分板的数据和排行
```lua 
coromega:start_new(function ()
  local rank,err=coromega:call_other_plugin_api("brain/scoreboard/rank_by_socreboard",{
      ["计分板名"]="金币",
      ["降序排列"]=true,
      ["最大查询数量"]=10,
  },1)
  coromega:print(rank.Results)
  for _,entry in pairs(rank.Results) do
      coromega:print(entry.PlayerName,entry.PlayerUID,entry.Score)
  end 
end)
``` 

示例代码: 每次查询计分板数据后，显示在场玩家的所有计分板和”金币“ 计分板的排行及数据
``` lua 
local omega = require("omega")
local json = require("json")
--- @type Coromega
local coromega = require("coromega").from(omega)

coromega:start_new(function ()
    local actual_config,err=coromega:call_other_plugin_api("brain/enable",{
        name="scoreboard",
        config={
            ["每次请求周期_秒"]=4,
        }
    },1)
    coromega:print(actual_config,err)
end)

coromega:when_new_data_in_subscribed_topic_named("brain/scoreboard/score_update"):start_new(function (data)
    -- 显示这次获取到的在线的所有人的所有计分板
    coromega:print("scores",data.scores)
    -- 显示计分板对应的显示名
    coromega:print("scoreboards",data.scoreboards)
    -- 显示相关玩家对应的 UUID
    coromega:print("players",data.players)


    local players = coromega:get_all_online_players()
    for _,player in pairs(players) do
        coromega:print(player:uuid_string())
        -- 查询每个在线人的所有计分板
        -- 这个 api 即使玩家不在线也可查询，只要知道 uid 即可
        local player_scores,err=coromega:call_other_plugin_api("brain/scoreboard/player_score_by_uid",{
            uid=player:uuid_string(),
        },1)
        -- 显示查询结果
        coromega:print(player:name(),"scores:",player_scores)
    end

    local rank,err=coromega:call_other_plugin_api("brain/scoreboard/rank_by_socreboard",{
        ["计分板名"]="金币",
        ["降序排列"]=true,
        ["最大查询数量"]=10,
    },1)
    coromega:print(rank.Results)
    for _,entry in pairs(rank.Results) do
        coromega:print(entry.PlayerName,entry.PlayerUID,entry.Score)
    end 
end)
```

### sidebar 侧边栏显示
启用服务
``` lua
coromega:start_new(function ()
    local _,err=coromega:call_other_plugin_api("brain/enable",{
        name="sidebar"
    },1)
    local _,err=coromega:call_other_plugin_api("brain/sidebar/scoreboard_add",{
        ["计分板名"]="公告",
        ["计分板显示名"]="§9§l公告栏",
        ["计分板轮播时间"]=10.0,
    },1)
end)
```
其中，计分板名只起标记作用，并不会真的创建这个计分板，它的存在只是为了后续api标记数据应该被推送到哪，以及轮播控制    
但是 计分板显示名 则会真的作为标题出现    
当多个插件都调用了这个 api，且具有不同的 计分板名 时， 这些计分板会轮流切换显示，每个计分板持续 计分板轮播时间 秒   

更新显示信息
``` lua 
coromega:start_new(function ()
    coromega:sleep(1)
    local _,err=coromega:call_other_plugin_api("brain/sidebar/scoreboard_update",{
        ["计分板名"]="公告",
        ["组名"]="第一组",
        ["信息"]={
           ["第一行的内容"]=10,
           ["第二行的内容"]=9,
        }
    },1)
    local i=0
    while true do
        i=i+1 
        coromega:sleep(1)
        local _,err=coromega:call_other_plugin_api("brain/sidebar/scoreboard_update",{
            ["计分板名"]="公告",
            ["组名"]="第二组",
            ["信息"]={
            [("i为%s"):format(i)]=8,
            [("负i为%s"):format(-i)]=7,
            }
        },1)
    end 
end)
```

这里，计分板名标记了数据将要被推送到哪儿，组名则将数据的更新分开。   
在这段代码中，我们显示了两行固定的信息和两行在不断变化的信息。  
我们只需将它们放在不同的组中就可以避免他们之间的信息更新相互干扰。  
即: 我们无需指明哪些信息需要被移除，哪些不需要，每次更新时，只有目标组的数据会被更新，其他组总是保持不变

使用示例
``` lua 
local omega = require("omega")
local json = require("json")
--- @type Coromega
local coromega = require("coromega").from(omega)

coromega:start_new(function ()
    local _,err=coromega:call_other_plugin_api("brain/enable",{
        name="sidebar"
    },1)
    local _,err=coromega:call_other_plugin_api("brain/sidebar/scoreboard_add",{
        ["计分板名"]="公告",
        ["计分板显示名"]="§9§l公告栏",
        ["计分板轮播时间"]=10.0,
    },1)

end)

coromega:start_new(function ()
    coromega:sleep(1)
    local _,err=coromega:call_other_plugin_api("brain/sidebar/scoreboard_update",{
        ["计分板名"]="公告",
        ["组名"]="第一组",
        ["信息"]={
           ["第一行的内容"]=10,
           ["第二行的内容"]=9,
        }
    },1)
    local i=0
    while true do
        i=i+1 
        coromega:sleep(1)
        local _,err=coromega:call_other_plugin_api("brain/sidebar/scoreboard_update",{
            ["计分板名"]="公告",
            ["组名"]="第二组",
            ["信息"]={
            [("i为%s"):format(i)]=8,
            [("负i为%s"):format(-i)]=7,
            }
        },1)
    end 
end)

coromega:run()
```



### listbar 暂停列表显示
listbar 和 sidebar 的 api 几乎完全一致，效果也是，只是显示的位置由侧边栏变为暂停菜单栏
api 名中的 sidebar 改为 listbar

启用服务
``` lua
coromega:start_new(function ()
    local _,err=coromega:call_other_plugin_api("brain/enable",{
        name="listbar"
    },1)
    local _,err=coromega:call_other_plugin_api("brain/listbar/scoreboard_add",{
        ["计分板名"]="公告",
        ["计分板显示名"]="§9§l公告栏",
        ["计分板轮播时间"]=10.0,
    },1)
end)
```

更新显示信息
``` lua 
coromega:start_new(function ()
    coromega:sleep(1)
    local _,err=coromega:call_other_plugin_api("brain/listbar/scoreboard_update",{
        ["计分板名"]="公告",
        ["组名"]="第一组",
        ["信息"]={
           ["第一行的内容"]=10,
           ["第二行的内容"]=9,
        }
    },1)
    local i=0
    while true do
        i=i+1 
        coromega:sleep(1)
        local _,err=coromega:call_other_plugin_api("brain/listbar/scoreboard_update",{
            ["计分板名"]="公告",
            ["组名"]="第二组",
            ["信息"]={
            [("i为%s"):format(i)]=8,
            [("负i为%s"):format(-i)]=7,
            }
        },1)
    end 
end)
```

这里，计分板名标记了数据将要被推送到哪儿，组名则将数据的更新分开。   
在这段代码中，我们显示了两行固定的信息和两行在不断变化的信息。  
我们只需将它们放在不同的组中就可以避免他们之间的信息更新相互干扰。  
即: 我们无需指明哪些信息需要被移除，哪些不需要，每次更新时，只有目标组的数据会被更新，其他组总是保持不变

使用示例
``` lua 
local omega = require("omega")
local json = require("json")
--- @type Coromega
local coromega = require("coromega").from(omega)

coromega:start_new(function ()
    local _,err=coromega:call_other_plugin_api("brain/enable",{
        name="listbar"
    },1)
    local _,err=coromega:call_other_plugin_api("brain/listbar/scoreboard_add",{
        ["计分板名"]="公告",
        ["计分板显示名"]="§9§l公告栏",
        ["计分板轮播时间"]=10.0,
    },1)

end)

coromega:start_new(function ()
    coromega:sleep(1)
    local _,err=coromega:call_other_plugin_api("brain/listbar/scoreboard_update",{
        ["计分板名"]="公告",
        ["组名"]="第一组",
        ["信息"]={
           ["第一行的内容"]=10,
           ["第二行的内容"]=9,
        }
    },1)
    local i=0
    while true do
        i=i+1 
        coromega:sleep(1)
        local _,err=coromega:call_other_plugin_api("brain/listbar/scoreboard_update",{
            ["计分板名"]="公告",
            ["组名"]="第二组",
            ["信息"]={
            [("i为%s"):format(i)]=8,
            [("负i为%s"):format(-i)]=7,
            }
        },1)
    end 
end)

coromega:run()
```


### 玩家视线和位置

这个服务能以非常高的频率报告玩家的精细位置，玩家视线方向      
因此可以做出非常强大的功能，例如玩家位置记录和视线菜单  

启用服务
``` lua
coromega:start_new(function ()
    coromega:call_other_plugin_api("brain/enable",{
        name="player_eye",
        config={
            ["每秒请求次数"]=4,
        }
    },1)
end)
```
这里需要说明的是，每秒请求次数=4实测是安全的，完全不会增加卡顿。   
如果你在下面的示例中感到卡顿，那是 actionbar 导致的。   

示例代码
``` lua 
local omega = require("omega")
local json = require("json")
--- @type Coromega
local coromega = require("coromega").from(omega)

coromega:print("config of xeyes:  ",json.encode(coromega.config))

-- 如果你需要调试请将下面一段解除注释，关于调试的方法请参考文档
-- local dbg = require('emmy_core')
-- dbg.tcpConnect('localhost', 9966)
-- print("waiting...")
-- for i=1,1000 do -- 调试器需要一些时间来建立连接并交换所有信息
--     -- 如果始终无法命中断点，你可以尝试将 1000 改的更大
--     print(".")
-- end
-- print("end")



local slots_angle=15
local h_slots=7
local h_right_limit=(slots_angle/2)+((h_slots-1)/2)*slots_angle
local h_left_limit=-h_right_limit
local last_y={}
local last_horizental={}
local xeye_on={}

coromega:start_new(function ()
    coromega:call_other_plugin_api("brain/enable",{
        name="player_eye",
        config={
            ["每秒请求次数"]=4,
        }
    },1)
end)

coromega:when_called_by_game_menu({
    triggers = { "xeye" },
    argument_hint = "",
    usage = "启用/关闭 xeye",
}):start_new(function(chat)
    local caller_name = chat.name
    if xeye_on[caller_name] then 
        xeye_on[caller_name]=false
    else 
        xeye_on[caller_name]=true
        last_y[caller_name]=nil 
        last_horizental[caller_name]=nil
    end 
end)


coromega:start_new(function ()
    coromega:when_new_data_in_subscribed_topic_named("brain/player_eye/update"):start_new(function (eye_poses)
        for player_name,eye_pos in pairs(eye_poses) do
            if xeye_on[player_name] then
                if last_horizental[player_name]==nil then
                    last_horizental[player_name]=eye_pos["水平角度"]
                end 
                if last_y[player_name]==nil then
                    last_y[player_name]=eye_pos["Y"]
                end 
                local jump=(eye_pos["Y"]-last_y[player_name])>0
                local down=(eye_pos["Y"]-last_y[player_name])<0
                last_y[player_name]=eye_pos["Y"]
                local now_h=eye_pos["水平角度"]
                local last_h=last_horizental[player_name]
                local h_offset=math.abs(now_h-last_h)
                if math.abs(now_h-(last_h+360))<h_offset then 
                    last_h=last_h+360
                end 
                if math.abs(now_h-(last_h-360))<h_offset then 
                    last_h=last_h-360
                end 
                h_offset=now_h-last_h

                if h_offset<= h_left_limit then 
                    h_offset=h_left_limit+1
                end 
                if h_offset> h_right_limit then 
                    h_offset=h_right_limit
                end 
                local h_i=math.floor((h_offset+slots_angle/2)/slots_angle)
                local v_i =eye_pos["垂直视线"]

                local m ="|"
                for row = -2, 2 do
                    for col=-((h_slots-1)/2),((h_slots+1)/2) do 
                        if row==-v_i and col==h_i then
                            m=m.."#"
                        else 
                            m=m.."_"
                        end 
                        
                    end 
                    if row~=2 then
                        m=m.."|\n|"
                    else 
                        m=m.."|"
                    end
                end
                if jump then
                    m=m.."\n > 跳起!\n|"
                end 
                if down then
                    m=m.."\n > 落下!\n|"
                end 
                m=m..("\n xeye\n[%s,%s,%s]\n[维度%s]"):format(
                    math.ceil(eye_pos["X"]),
                    math.ceil(eye_pos["Y"]),
                    math.ceil(eye_pos["Z"]),
                    eye_pos["维度"])
                coromega:send_wo_cmd(("title %s actionbar %s"):format(player_name,m))
            end
        end 
    end)
end)

coromega:run()
```

在聊天栏输入 xeye 一个界面将在你眼前打开，   
界面包括了一个根据你视线方向定位的光标   
和详细的坐标及维度信息  