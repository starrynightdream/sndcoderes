def n_more_then_x(t_num: int):
    idx, num = 0, 1
    while num < t_num:
        num <<= 1
        idx += 1
    return idx, num

print(n_more_then_x(10000))