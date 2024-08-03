---
lang: zh-CN
title: 其他
description: 其他
---

# 其他

## 生成一个 uuid 字符串
- uuid()
    - 范围: 任意
    - 说明: 生成一个 uuid 字符串
    - 参数: 无
    - 返回: uuid 字符串
    ``` lua
    coromega:print(coromega:uuid())
    ```

## 翻译
- translate(input,type)
    - 范围: 任意
    - 说明: 翻译特定的mc内容为中文
    - 参数: 
        - input 输入字符串
        - type 翻译类型 "mc"/ "block"/"item"/"conatiner_data"/"conatiner_slot_data/"item_data"
    - 返回: 翻译结果，是否成功
    ``` lua
    coromega:print(coromega:translate("stone")) -- 石头 true
    coromega:print(coromega:translate("stone","mc")) --石头 true
    coromega:print(coromega:translate("stone [type=?]","block")) -- 石头[type=?] true
    coromega:print(coromega:translate("iron_sword","item")) -- 铁剑 true
    -- 关于 "conatiner_data"/"conatiner_slot_data/"item_data" 的获取，请参阅 bot action 这一章
    coromega:print(coromega:translate("{\"0\":{\"item\":{\"name\":\"stone\",\"val\":0,\"base_props\":{\"can_place_on\":[\"minecraft:grass\",\"minecraft:stone\"],\"can_destroy\":[\"minecraft:sand\"]},\"is_block\":true,\"block_bedrock_state_string\":\"[\\\"stone_type\\\"=\\\"stone\\\"]\"},\"count\":5},\"1\":{\"item\":{\"name\":\"minecraft:diamond_sword\",\"val\":0,\"base_props\":{\"can_place_on\":[\"minecraft:grass\",\"minecraft:stone\"],\"can_destroy\":[\"minecraft:sand\"],\"keep_on_death\":true},\"is_block\":false,\"display_name\":\"剑1\"},\"count\":1},\"2\":{\"item\":{\"name\":\"white_shulker_box\",\"val\":0,\"is_block\":true,\"block_bedrock_state_string\":\"[]\",\"complex_block_data\":{\"container\":{\"0\":{\"item\":{\"name\":\"minecraft:writable_book\",\"val\":0,\"is_block\":false,\"specific_known_item_data\":{\"pages\":[\"0\",\"0\",\"0\"]}},\"count\":1},\"1\":{\"item\":{\"name\":\"minecraft:written_book\",\"val\":0,\"is_block\":false,\"specific_known_item_data\":{\"pages\":[\"0\",\"0\",\"0\"],\"book_author\":\"无名之人\",\"book_name\":\"有名之书\"}},\"count\":1},\"2\":{\"item\":{\"name\":\"minecraft:written_book\",\"val\":0,\"is_block\":false,\"specific_known_item_data\":{\"pages\":[\"0\",\"0\",\"0\"],\"book_author\":\"无名之人\",\"book_name\":\"有名之书\"},\"display_name\":\"铁砧\"},\"count\":1}}}},\"count\":1}}","container_data")) 
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
    coromega:print(coromega:translate("{\"item\":{\"name\":\"stone\",\"val\":0,\"base_props\":{\"can_place_on\":[\"minecraft:grass\",\"minecraft:stone\"],\"can_destroy\":[\"minecraft:sand\"]},\"is_block\":true,\"block_bedrock_state_string\":\"[\\\"stone_type\\\"=\\\"stone\\\"]\"},\"count\":5}","container_slot_data")) 
    -- 5个 石头[特殊值=0] 物品方块属性:["stone_type"="stone"]
    -- -基础属性:
    --  可被放置于:  草方块 石头 false
    coromega:print(coromega:translate("{\"name\":\"stone\",\"val\":0,\"base_props\":{\"can_place_on\":[\"minecraft:grass\",\"minecraft:stone\"],\"can_destroy\":[\"minecraft:sand\"]},\"is_block\":true,\"block_bedrock_state_string\":\"[\\\"stone_type\\\"=\\\"stone\\\"]\"}","item_data")) 
    -- 石头[特殊值=0] 物品方块属性:["stone_type"="stone"]
    -- -基础属性:
    -- 可被放置于:  草方块 石头 false
    ```

## 字符串操作
由于默认的 lua 解释器对含中文字符串的位置相关操作是以byte为基准的,  
例如 "一二三" 不是3个字而是 9 个比特，然而这样很反直觉，且给字符串截取操作带来很多困难，  
为此，我们将字符串相关所有位置信息都改为 rune 实现，即按 字 来计算   
以下是一些例子
``` lua 
print(string.find("Hello Lua user", "Lua", 1)) -- 7    9
print(string.find("Hello Lua user", "Lua", 8)) -- nil
print(string.find("一二三四五", "二")) -- 2 2
print(string.find("一二三四五", "二", 3)) -- nil
print(string.find("Hello Lua user", "Lua", 1, true)) -- 7    9
print(string.find("Hello Lua user", "Lua", 8, true)) -- nil
print(string.find("一二三四五", "二", 2, true)) -- 2 2
print(string.find("一二三四五", "二", 3, true)) -- nil
print(string.gsub("aaaa", "a", "z", 3)) -- zzza    3
print(string.gsub("一二三四五", "三", "十", 3)) -- 一二十四五
print(string.reverse("Lua")) -- auL
print(string.reverse("一二三")) -- 一二三
print(string.format("the value is:%d", 4)) -- the value is:4
print(string.char(97, 98, 99, 100)) --abcd
print(string.char(97, 98, 99, 22235)) --abc四
print(string.byte("ABCD", 4)) -- 68
print(string.byte("一二三四", 4)) -- 22235
print(string.len("abc")) -- 3
print(string.len("一二三")) -- 3
print(string.rep("abcd", 2)) -- abcdabcd
print(string.rep("一二三", 2)) -- 一二三一二三
print(string.sub("一二三四五", 3, 4)) --三四

print(string.match("I have 2 questions for you.", "%d+ %a+")) -- 2 questions
print(string.match("I have 二 questions for you.", "二 %a+")) -- 2 questions
print(string.match("I have 2 questions for you.", "(%d+) (%a+)")) -- 2, "questions"
print(string.match("I have 二 questions for you.", "(二) (%a+)")) -- 二, "questions"
for word in string.gmatch("二Hello 二Lua 二user", "二%a+") do
	print(word)
end
-- 二Hello
-- 二Lua
-- 二user
for word in string.gmatch("Hello Lua user", "%a+") do
	print(word)
end
-- Hello
-- Lua
-- user

```