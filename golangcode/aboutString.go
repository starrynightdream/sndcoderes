package golangcode

// 从left 和 right 开始搜索，寻找回文字符串
func findPalindromeWithLR(s string, left, right int) string {
	sl := len(s)
	for left > -1 && right < sl {
		if s[left] != s[right] {
			left++
			right--
			break
		}
		left--
		right++
	}
	if left < 0 {
		right += left
		left = 0
	}
	if right >= sl {
		left += right - sl + 1
		right = sl - 1
	}

	if left > right {
		return s[right : left+1]
	}
	return s[left : right+1]
}
