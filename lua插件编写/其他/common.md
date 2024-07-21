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
