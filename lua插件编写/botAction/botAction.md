---
lang: zh-CN
title: 容器支持
description: 容器支持
---


### 容器支持
``` lua 
local omega = require("omega")
local json = require("json")
--- @type Coromega
local coromega = require("coromega").from(omega)

-- 如果你需要调试请将下面一段解除注释，关于调试的方法请参考文档
-- local dbg = require('emmy_core')
-- dbg.tcpConnect('localhost', 9966)
-- print("waiting...")
-- for i=1,1000 do -- 调试器需要一些时间来建立连接并交换所有信息
--     -- 如果始终无法命中断点，你可以尝试将 1000 改的更大
--     print(".")
-- end
-- print("end")

-- 容器支持
coromega:when_called_by_terminal_menu({
    triggers = { "chest" },
    argument_hint = "",
    usage = "chest",
}):start_new(function(input)
    -- 假设在 1036，102，1038 处有一个 nbt 方块，我们要先读出来
    local move_bot=true -- 机器人读取前自动移动到附近
    -- 读取这片区域 (只有1格)
    local canvas = coromega:request_structure({x=1036,y=102,z=1038},{x=1,y=1,z=1},true)
    -- 这片区域的起点是? -- {"x":1036,"y":102,"z":1038}
    coromega:print(canvas:get_start_pos())
    -- 这个方块是什么?
    local block_runtime_id,found =canvas:block({x=1036,y=102,z=1038})
    if not found then
        error("没有方块! 获取失败!")
    end 
    local block_name, block_state = omega.blocks.rtid_to_block_name_and_state(block_runtime_id)
    -- 方块名=chest 方块属性=["facing_direction"=4]
    coromega:print(("方块名=%s 方块属性=%s"):format(block_name, block_state))
    -- 这个方块有nbt吗?
    local block_runtime_id,nbt,found =canvas:block_with_nbt({x=1036,y=102,z=1038})
    if nbt:is_empty() then 
        error("nbt 是空的! ")
    end 
    -- nbt 里有什么?
    -- {"Findable": 0b, "IsIgnoreShuffle": 0b, "IsOpened": 1b, "Items": [{"Block": {"name": "minecraft:stone", "states": {"stone_type": "stone"}, "val": 0s, "version": 18090528}, "CanDestroy": ["minecraft:sand"], "CanPlaceOn": ["minecraft:grass", "minecraft:stone"], "Count": 5b, "Damage": 0s, "Name": "minecraft:stone", "Slot": 0b, "WasPickedUp": 0b}, {"CanDestroy": ["minecraft:sand"], "CanPlaceOn": ["minecraft:grass", "minecraft:stone"], "Count": 1b, "Damage": 0s, "Name": "minecraft:diamond_sword", "Slot": 1b, "WasPickedUp": 0b, "tag": {"Damage": 0, "RepairCost": 0, "display": {"Name": "剑1"}, "minecraft:keep_on_death": 1b}}, {"Block": {"name": "minecraft:white_shulker_box", "states": {}, "val": 0s, "version": 18090528}, "Count": 1b, "Damage": 0s, "Name": "minecraft:white_shulker_box", "Slot": 2b, "WasPickedUp": 0b, "tag": {"Items": [{"Count": 1b, "Damage": 0s, "Name": "minecraft:writable_book", "Slot": 0b, "WasPickedUp": 0b, "tag": {"pages": [{"photoname": "", "text": "0"}, {"photoname": "", "text": "0"}, {"photoname": "", "text": "0"}]}}, {"Count": 1b, "Damage": 0s, "Name": "minecraft:written_book", "Slot": 1b, "WasPickedUp": 0b, "tag": {"author": "无名之人", "generation": 0, "pages": [{"photoname": "", "text": "0"}, {"photoname": "", "text": "0"}, {"photoname": "", "text": "0"}], "title": "有名之书", "xuid": ""}}, {"Count": 1b, "Damage": 0s, "Name": "minecraft:written_book", "Slot": 2b, "WasPickedUp": 0b, "tag": {"RepairCost": 0, "author": "无名之人", "display": {"Name": "铁砧"}, "generation": 0, "pages": [{"photoname": "", "text": "0"}, {"photoname": "", "text": "0"}, {"photoname": "", "text": "0"}], "title": "有名之书", "xuid": ""}}]}}], "id": "Chest", "isMovable": 1b, "x": 1036, "y": 102, "z": 1038}
    coromega:print(nbt:to_str())

    -- 那么，关键是，我该如何才能有效的对它操作?
    -- 首先，为了让各位使用起来变得容易，我们后面的api全部使用 json 字符串，
    -- 但是这种还不行，因为它会丢失信息，所以我们必须将其转换成支持的格式的 json 字符串，这样信息就不会丢失了 
    -- 而支持的 nbt 目前包括: 容器、告示牌、展示框、命令块, 它们的 support type 分别是 container_data,sign_data,item_data,command_block_data
    
    local supported_json_str,aux_info,support_type=nbt:to_supported_json(block_runtime_id)
    if support_type=="fail" then 
        error("不行,这种nbt,不支持")
    else
        coromega:print("支持类型为: ",support_type) -- container_data
    end
    -- 只有展示框的旋转才会输出在 aux_info 中，aux_info 不然都是空的
    -- supported_json_str 长啥样? {"0":{"item":{"name":"stone","val":0,"base_props":{"can_place_on":["minecraft:grass","minecraft:stone"],"can_destroy":["minecraft:sand"]},"is_block":true,"block_bedrock_state_string":"[\"stone_type\"=\"stone\"]"},"count":5},"1":{"item":{"name":"minecraft:diamond_sword","val":0,"base_props":{"can_place_on":["minecraft:grass","minecraft:stone"],"can_destroy":["minecraft:sand"],"keep_on_death":true},"is_block":false,"display_name":"剑1"},"count":1},"2":{"item":{"name":"white_shulker_box","val":0,"is_block":true,"block_bedrock_state_string":"[]","complex_block_data":{"container":{"0":{"item":{"name":"minecraft:writable_book","val":0,"is_block":false,"specific_known_item_data":{"pages":["0","0","0"]}},"count":1},"1":{"item":{"name":"minecraft:written_book","val":0,"is_block":false,"specific_known_item_data":{"pages":["0","0","0"],"book_author":"无名之人","book_name":"有名之书"}},"count":1},"2":{"item":{"name":"minecraft:written_book","val":0,"is_block":false,"specific_known_item_data":{"pages":["0","0","0"],"book_author":"无名之人","book_name":"有名之书"},"display_name":"铁砧"},"count":1}}}},"count":1}}
    coromega:print(supported_json_str)
    -- wow, 不是很好读对吗? 没关系, 你可以用这个:
    coromega:print(coromega:translate(supported_json_str,"container_data"))
    -- 容器内容:
    --  5个 石头[特殊值=0] 物品方块属性:["stone_type"="stone"]
    --  |  -基础属性:
    --  |   可被放置于:  草方块 石头
    --  1个 钻石剑[特殊值=0]
    --  |  -基础属性:
    --  |   可被放置于:  草方块 石头
    --  |   死亡时保留
    --  |  -被命名为: 剑1
    --  1个 白色潜影盒[特殊值=0] 物品方块属性:[]
    --  |  -包含子容器: 
    --  |   容器内容:
    --  |     1个 书与笔[特殊值=0]
    --  |     |  -信息:书名:  作者:  页数: 3
    --  |     1个 minecraft:written_book[特殊值=0]
    --  |     |  -信息:书名: 有名之书 作者: 无名之人 页数: 3
    --  |     1个 minecraft:written_book[特殊值=0]
    --  |     |  -信息:书名: 有名之书 作者: 无名之人 页数: 3
    --  |     |  -被命名为: 铁砧 false

        -- 现在，你可以安全的操作这个json了，用任何你喜欢的方式，比如我在这里要把第0格的东西复制一份放在第5格
        local data=json.decode(supported_json_str)
        data["5"]=json.decode(json.encode(data["0"]))

        -- 当然，你也可以读取其中的一个槽或者里面的物品信息，并用易于读取的方式显示他们
        coromega:print(coromega:translate(json.encode(data["0"]),"container_slot_data")) 
        -- 5个 石头[特殊值=0] 物品方块属性:["stone_type"="stone"]
        -- -基础属性:
        --  可被放置于:  草方块 石头 false
        coromega:print(coromega:translate(json.encode(data["0"]["item"]),"item_data")) 
        -- 石头[特殊值=0] 物品方块属性:["stone_type"="stone"]
        -- -基础属性:
        --  可被放置于:  草方块 石头 false

    -- 你可以进行任何你喜欢的操作，只需要记得把它变回 json_str 
    supported_json_str = json.encode(data)

    -- 那么，现在，boom，该生成这个箱子了!
    local err=coromega:high_level_gen_container({x=1036,y=104,z=1038},supported_json_str,"chest [\"facing_direction\"=4]")
    if err~=nil then
        coromega:print("出现错误: ",err)
    else
        coromega:print("成功!")
    end
end)

coromega:run()
```