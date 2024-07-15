---
lang: zh-CN
title: 密码、哈希和 Base64 编码
description: 密码、哈希和 Base64 编码
---

# 密码、哈希和 Base64 编码相关 API

基本上，这部分直接使用了 [tengattack/gluacrypto](https://github.com/tengattack/gluacrypto) 提供的库

详细信息和细节请参考 [tengattack/gluacrypto](https://github.com/tengattack/gluacrypto) 的实现

特别的，涉及到加密解密的部分时，您还需有一定密码学基础

不过，为了方便上手，我们提供了一个示例演示各种可用的 api

```lua
local omega = require("omega")
local coromega = require("coromega").from(omega)
local crypto = require("crypto") -- 先导入库

coromega:when_called_by_terminal_menu({
    triggers = { "crypto" },
    argument_hint = "",
    usage = "crypto",
}):start_new(function(input)
    -- base64_encode/decode
    local before = "hello world"
    local after_base64_encoding = crypto.base64_encode(before)
    coromega:print(after_base64_encoding)
    local after_base64_decoding = crypto.base64_decode(after_base64_encoding)
    coromega:print(after_base64_decoding)

    -- base64_url_encode/decode
    before = "abcdd>ee?"
    local after_base64_encoding = crypto.base64_url_encode(before)
    coromega:print(after_base64_encoding)
    local after_base64_decoding = crypto.base64_url_decode(after_base64_encoding)
    coromega:print(after_base64_decoding)

    -- md5
    local md5 = crypto.md5(after_base64_decoding)
    coromega:print(md5)

    -- sha1
    local sha1 = crypto.sha1(after_base64_decoding)
    coromega:print(sha1)

    -- sha256
    local sha256 = crypto.sha256(after_base64_decoding)
    coromega:print(sha256)

    -- sha512
    local sha512 = crypto.sha512(after_base64_decoding)
    coromega:print(sha512)

    -- crc32
    local crc32 = crypto.crc32(after_base64_decoding)
    coromega:print(crc32)

    -- hmac
    local key = "240"
    local algorithm = "md5"
    -- local algorithm="sha1"
    -- local algorithm="sha256"
    -- local algorithm="sha512"
    local hmac = crypto.hmac(algorithm, after_base64_decoding, key)
    coromega:print("hamc", hmac)

    -- encrypt/decrype
    local method = "des-ecb"
    local key = "key12345"
    local iv = "12345678"

    -- local method="des-cbc"
    -- local key="key12345"
    -- local iv = "12345678"

    -- local method="aes-cbc" -- 这种加密/解密方式对 key 和 iv 的长度有不一样的要求
    -- local key = "key1234567890123" -- key128
    -- local iv = "1234567890123456"  -- iv 128

    local message = "abcdd>ee?"
    local options = 0
    -- local options=crypto.RAW_DATA / crypto.ZERO_PADDING
    local cipher = crypto.encrypt(message, method, key, options, iv) -- 加密
    coromega:print(cipher)
    local message = crypto.decrypt(cipher, method, key, options, iv) -- 解密
    coromega:print(message)


end)

coromega:run()

```
