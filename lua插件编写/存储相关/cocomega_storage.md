---
lang: zh-CN
title: 路径、存储
description: 存储示例
---

# 存储相关 api(storage_path & storage)

## 获取 config 文件 (插件) 路径

- config_path_of(...)
  - 范围：任意
  - 说明：获取 config 文件 (插件) 路径
  - 参数：任意数量的 config 后需要添加的路径
    > 参数可以是想要加上的子目录或者文件名 参数会直接加再代码文件路径后面
  - 返回值：返回 config + 参数的文件存储路径

```lua
coromega:config_path_of("test") -- ${neomega_storage}/config/test
coromega:config_path_of("插件","配置.json") -- ${neomega_storage}/config/插件/配置.json
```

## 获取代码文件 (插件) 路径

- code_path_of(...)
  - 范围：任意
  - 说明：获取代码文件 (插件) 路径
  - 参数：任意数量 code 后需要添加的路径
    > 参数可以是想要加上的子目录或者文件名 参数会直接加再代码文件路径后面
  - 返回值：返回代码文件路径加上参数路径后的新路径字符串

```lua
coromega:code_path_of("LuaLoader","test") -- {$storage$}/lang/LuaLoader/test
```

## 获取 data 文件路径

- data_path_of(...)
  - 范围：任意
  - 说明：获取 data 文件路径
  - 参数：任意数量 data 后需要添加的路径
    > 参数可以是想要加上的相对子目录或者文件路径 参数会直接加再代码文件路径后面
  - 返回值：返回 data+ 参数的文件存储路径

```lua
  coromega:data_path_of("test") -- {$storage$}/data/test
  coromega:data_path_of("小说文件夹","雪国冒险奇谭.txt") -- {$storage$}/data/小说文件夹/雪国冒险奇谭.txt
```

## 获取 cache 加上参数后的路径

- cache_path_of(...)
  - 范围：任意
  - 说明：获取 cache 加上参数后的路径
    - neomega 不会清除此路径下的文件<br>
      但是，如果此路径下的文件被清除，相关程序应当能正常工作<br>
      换句话说，应当检查 cache 下的文件是否存在，而不能假设它存在
  - 参数：任意数量 cache 后需要添加的路径
    > 参数可以是想要加上的子目录或者文件路径<br>
    > 这个通常是使用于网络的缓存 参数会直接加再代码文件路径后面
  - 返回值：返回 cache+ 参数的文件存储路径

```lua
  coromega:cache_path_of("test") -- {$storage$}/cache/test
```

## 创建临时目录

- make_temp_dir()
  - 范围：任意
  - 说明：新建一个临时文件夹，并返回该文件夹的路径，每次 neomega 重启时都会移除该文件夹
    :::tip
    需要说明的一点是，该文件夹支持正常的读写和执行权限，而非类似安卓 Downloads 文件夹 (neomega 默认路径) 那样没有执行权限
    :::
  - 返回值：临时文件夹的路径

```lua
  coromega:make_temp_dir() -- 路径
```

## 路径拼接

- path_join(...)
  - 范围：任意
  - 说明：将参数拼接成新路径
  - 参数：任意数量的路径字符串
  - 返回值：返回拼接后的路径

```lua
  local path = coromega:path_join("storage","test") -- storage/test
```

## 目列出目录下所有文件/文件夹

- path_list(path)
  - 范围：任意
  - 说明：列出所有 path 路径下的文件或者目录
  - 参数：
    - path: 指定路径
  - 返回值：文件/目录

```lua
  local all_files = coromega:path_list("storage")
  local all_files = coromega:path_list("path/to/dir")
  local all_files = coromega:path_list(coromega:path_join("storage","test"))
```

## 获取绝对路径

- path_abs(path)
  - 范围：任意
  - 说明：获取 path 文件/目录路径的绝对路径
  - 参数：
    - path: 需要获取的路径
  - 返回值：返回 path 路径的绝对路径

```lua
  local abs_path = coromega:path_abs("storage")
```

## 获取文件扩展名

- path_ext(path)
  - 范围：任意
  - 说明：获取 path 路径文件的扩展名
  - 参数：
    - path: 需要获取文件的路径
  - 返回值：返回 path 路径的扩展名

```lua
  local ext = coromega:path_ext("test.lua") -- .lua
```

## 移动文件

- path_move(src, dst)
  - 范围：任意
  - 说明：将 src 路径文件或者目录移动到 dst 路径，相当于剪切
  - 参数：
    - src: 需要移动的路径
    - dst: 移动后的路径
  - 返回值：无

```lua
  coromega:path_move("test","test2")
```

## 删除文件/目录

- path_remove(path)
  - 范围：任意
  - 说明：删除 path 路径文件/目录
  - 参数：
    - path: 需要删除的文件路径/目录
  - 返回值：无

```lua
  coromega:path_remove("test")
```

## 判断路径是否存在

- path_exist(path)
  - 范围：任意
  - 说明：判断 path 路径是否存在
  - 参数：
    - path: 需要判断的路径
  - 返回值：返回 path 路径是否存在

```lua
  local is_exist = coromega:path_exist("test")
```

## 字符串保存至文件

- save_text(path, data)
  - 范围：任意
  - 说明：将文本/字符串保存到 path 路径的文件中去
  - 参数：
    - path: 需要保存的文件路径
    - text: 需要保存的文本/字符串
  - 返回值：无

```lua
  coromega:save_text(coromega:data_path_of("test.txt"),"Hello World!")
```

## 读取文件字符串

- load_text(path)
  - 范围：任意
  - 说明：从 path 路径读取文本数据
  - 参数：
    - path: 需要读取的路径
  - 返回值：返回读取的数据

```lua
  local data = coromega:load_text(coromega:data_path_of("test.txt"))
```

## 数据保存至文件

- save_data(path, data)
  - 范围：任意
  - 说明：将 data 数据以 json 形式保存到 path 路径的文件中去
  - 参数：
    - path: 需要保存的文件路径
    - data: 需要保存的数据
  - 返回值：无

```lua
  coromega:save_data(coromega:data_path_of("test.json"),"Hello World!")
```

## 读取文件数据

- load_data(path)
  - 范围：任意
  - 说明：从 path 路径读取 json 数据
  - 参数：
    - path: 需要读取的路径
  - 返回值：返回读取的数据

```lua
  local data = coromega:load_data(coromega:data_path_of("test.json"))
```

# 数据库相关 api(database)

> 以下均为 db 对象的方法
> 这里需要特殊注意 neomega 使用的数据库是键值对数据库 也就是 key:value 的形式 key 和 value 都是字符串

## 创建数据库对象

- key_value_db(path)
  - 范围：任意
  - 说明：根据 path 路径的数据库文件创建一个 key_value_db 对象<br>
    也就是 db 对象 如果不含有该文件 则自动创建 然后返回 db 对象
  - 参数：
    - path: 数据库的路径
  - 返回值：返回一个 key_value_db 对象

```lua
  local db = coromega:key_value_db("存储文件")
```

## 获取数据对象

- get(key)
  - 范围：任意
  - 说明：获取 key 的值
  - 参数：key 为你需要查询的键值对的索引值 (也就是键值)
  - 返回值：返回 key 的值 如果没有可以通过~=""或者 not value 来判断

```lua
  local value = db:get("test")
  if not value then
      coromega:print("不存在该字符串")
  end
```

## 存储数据

- set(key, value)
  - 范围：任意
  - 说明：向数据库中存入一对数据
  - 参数：key 为索引 value 为存入的值
  - 返回值：无

```lua
  db:set("test","Hello World!")
  db:set("age",18)
  db:set("author",{name="somebody",age=18,keywords={"machine_learning","computer_version","nlp"}})
```

## 删除数据

- delete(key)
  - 范围：任意
  - 说明：删除 key 索引对应的键值对<br>
    其本质就是 coromega:set(key,nil) 也就是将 key 对应的 value 的值设为nil(空)
  - 参数：
    - key: 需要删除的 key
  - 返回值：无

```lua
  db:delete("test")
```

## 遍历数据库

- iter(fn)
  - 范围：任意
  - 说明：遍历数据库 为每一个键值对执行函数 fn
  - 参数：
    - fn: 遍历时的回调函数
  - 返回值：无

```lua
  db:iter(function(key, value)
      coromega:print(key, value)
      local next=true
      return next
  end)
```
