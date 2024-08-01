---
lang: zh-CN
title: 系统功能
description: 系统功能示例
---

# system

## 在终端显示信息

- print(...)
  - 范围：任意
  - 说明：在终端显示信息，会试图使内容尽量可读，即使包含不可转为字符串的内容
  - 参数：... 为任意参数
  - 返回值：无

```lua
  coromega:print("在终端显示: ", 1, { "a", "b" })
```

## 字符串MC颜色转换

- sprint(...)
  - 范围：任意
  - 说明：获取转换MC颜色代码后的字符串，使其能在终端显示相应颜色的信息
  - 参数：... 为任意参数
  - 返回值：color_msg 颜色格式化后的信息

```lua
  local color_msg = coromega:sprint(("§l§b%s §r§o§e%s"):format("Hello","World"))
  print(color_msg)
```

## 记录日志

- log(...)
  - 范围：任意
  - 说明：在日志中记录信息，会试图使内容尽量可读，即使包含不可转为字符串的内容
  - 参数：... 为任意参数
  - 返回值：无

```lua
  coromega:log("记录日志: ", 1, { "a", "b" })
```

## 在终端显示信息并记录日志

- log_and_print(...)
  - 范围：任意
  - 说明：在终端显示信息并记录日志，会试图使内容尽量可读，即使包含不可转为字符串的内容
  - 参数：... 为任意参数
  - 返回值：无

```lua
  coromega:log_and_print("在终端显示并记录日志: ", 1, { "a", "b" })
```

## 以 DEBUG(最低级别) 在终端显示信息或记录日志

- debug_out(...)
  - 范围：任意
  - 说明：在终端显示信息并记录日志，会试图使内容尽量可读，即使包含不可转为字符串的内容，
  默认不会显示或记录日志，除非在配置中将 DEBUG 的显示级别设为终端或日志
  显示和日志的前缀将包含 [DEBUG]
  - 参数：... 为任意参数
  - 返回值：无

```lua
  coromega:debug_out("不会显示或记录日志，除非在配置中将 DEBUG 的显示级别设为 终端或日志: ", 1, { "a", "b" })
```

## 以 INFO(较低级别) 在终端显示信息或记录日志

- info_out(...)
  - 范围：任意
  - 说明：默认在终端显示并记录日志，除非调整框架配置中的 INFO 显示级别 (在最后几行)
  显示和日志不包含前缀
  - 参数：... 为任意参数
  - 返回值：无

```lua
  coromega:info_out("不会显示或记录日志，除非在配置中将 DEBUG 的显示级别设为 终端或日志: ", 1, { "a", "b" })
```

## 以 SUCCESS 级别在终端显示信息或记录日志

- success_out(...)
  - 范围：任意
  - 说明：添加绿色的修饰，默认在终端显示并记录日志，除非调整框架配置中的 Success 显示级别 (在最后几行)
  - 参数：... 为任意参数
  - 返回值：无

```lua
  coromega:success_out("添加绿色的修饰，默认在终端显示并记录日志，除非调整框架配置中的 Success 显示级别 (在最后几行): ", 1, { "a", "b" })
```

## 以 WARNING 级别在终端显示信息或记录日志

- warning_out(...)
  - 范围：任意
  - 说明：添加黄色的修饰，默认在终端显示并记录日志，除非调整框架配置中的 Warning 显示级别 (在最后几行)
  - 参数：... 为任意参数
  - 返回值：无

```lua
  coromega:warning_out("添加黄色的修饰，默认在终端显示并记录日志，除非调整框架配置中的 Warning 显示级别 (在最后几行): ", 1, { "a", "b" })
```

## 以 ERROR 级别在终端显示信息或记录日志

- error_out(...)
  - 范围：任意
  - 说明：添加红色的修饰，默认在终端显示并记录日志，除非调整框架配置中的 Error 显示级别 (在最后几行)
  - 参数：... 为任意参数
  - 返回值：无

```lua
  coromega:error_out("添加红色的修饰，默认在终端显示并记录日志，除非调整框架配置中的 Error 显示级别 (在最后几行): ", 1, { "a", "b" })
```


## 从终端获取输入

- input(hint,timeout)
  - 范围：协程内
  - 说明：从终端获取输入，末尾的换行符号 ("\n") 会被移除
  - 参数：hint 为提示信息
  - 参数：timeout 为输入超时 (超时时会获得空输入)
  - 返回值：输入的内容

```lua
  local input1 = coromega:input("请输入：")
  local input2 = coromega:input("请输入：",3.1)
```

- backend_input(hint,timeout)
  - 范围：协程内
  - 说明：从终端获取输入，效果和 input 完全相同
  - 参数：hint 为提示信息
  - 参数：timeout 为输入超时 (超时时会获得空输入)
  - 返回值：输入的内容

```lua
  local input1 = coromega:backend_input("请输入：")
  local input2 = coromega:backend_input("请输入：",3.1)
```

## 系统架构信息

- os()
  - 范围：任意
  - 说明：获取操作系统和架构信息，例如 "linux-amd64"
  - 参数：... 为任意参数
  - 返回值：字符串形式的操作系统和架构信息

```lua
  local system_and_arch = coromega:os()
```

## 获取当前目录

- current_dir()
  - 范围：任意
  - 说明：获取当前目录
  - 参数：无
  - 返回值：当前目录

```lua
  local current_dir = coromega:current_dir()
```

## 创建目录

- make_dir(path)
  - 范围：任意
  - 说明：创建目录
  - 参数：path 为目录地址
  - 返回值：无

```lua
  coromega:make_dir("test")
```

## 创建临时目录

- make_temp_dir()
  - 范围：任意
  - 说明：创建临时目录 这个目录会在 omega 框架退出时或重启时自动删除
    由 neomega 保证这个目录内文件有可执行权限和其他权限
    > 安卓的 Download 目录，即 neomega 在安卓上的默认目录没有可执行权限
  - 参数：无
  - 返回值：临时目录地址

```lua
  coromega:make_temp_dir()
```

## 获取当前时间

- now()
  - 范围：任意
  - 说明：获取当前时间 单位秒 (unix time)
  - 参数：无
  - 返回值：当前时间

```lua
  coromega:now()
```

- now_unix()
  - 范围：任意
  - 说明：获取当前时间 单位秒 (unix time), 同 now()
  - 参数：无
  - 返回值：当前时间

```lua
  coromega:now_unix()
```

## 获取插件启动时间

- now_since_start()
  - 范围：任意
  - 说明：从插件启动开始的时间单位秒
  - 参数：无
  - 返回值：当前时间

```lua
  coromega:now_since_start()
```

## 睡眠（休眠、暂停）

- sleep(time)
  - 范围：任意
  - 说明：睡眠
  - 参数：time 为睡眠时间 单位秒。当时间过短时，可能会因为系统原因导致 sleep 时间不精确
  - 返回值：无

```lua
  coromega:sleep(1.1)
```

## 创建协程

- start_new(func)
  - 范围：任意
  - 说明：在一个新的协程中开始执行指定的函数
  - 参数：没有输入也没有输出的函数
  - 返回值：无

```lua
  coromega:start_new(function()
      coromega:print("running in a new coroutine!")
  end)
```

## 暂停协程

- pause() & get_resume()
  - 范围：协程内
  - 说明：pause 暂停一个协程，直到 get_resume() 获取的回执获得结果

```lua
  coromega:start_new(function()
      coromega:print("running in coroutine 1")
      local resumable=coromega:get_resume()
      coromega:start_new(function()
          coromega:print("running in coroutine 2")
          coromega:print("coroutine 2 sleep 3s")
          coromega:sleep(3.0)
          coromega:print("coroutine 2 awake")
          resumable("2401")
          coromega:print("coroutine 2 exit")
      end)
      coromega:print("coroutine 1 paused!")
      local ret=coromega:pause()
      coromega:print(("coroutine 1 resumed, with ret %s"):format(ret))
      coromega:print("coroutine 1 exit")
  end)
```

## 使能协程

- run()
  - 范围：任意
  - 说明：使能协程，完成 go 到 lua 的数据推送转协程恢复，一般在插件最后一行
  - 返回值：无

```lua
  coromega:run()
  print("这行永远不会被运行")
```

## 失能协程

- halt()
  - 范围：任意
  - 说明：失能协程，打断 go 到 lua 的数据推送转协程恢复，调用后所有挂起的协程都不再恢复，可认为插件已经无效
  - 返回值：无

```lua
  coromega:halt()
```
