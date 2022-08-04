# 不成熟的随机文件内容生产脚本
import math
from random import random, randint, shuffle

from torch import CallStack

def has_func(obj, name):
    if hasattr(obj, name):
        val = getattr(obj, name)
        if hasattr(val, '__call__'):
            return True
    return False

class node:
    def __init__(self) -> None:
        self.left = None
        self.right = None
        self.sign = 'none'
        self.val = 0
    
    # useless
    def Left(self):
        return self.left
    def Right(self):
        return self.right
    def Sign(self):
        return self.sign
    def Val(self):
        return self.val
    
    def set_left(self, left):
        self.left = left
    def set_right(self, right):
        self.right = right
    def set_sign(self, sign):
        self.sign = sign
    def set_val(self, val):
        self.val = val


# order func
# 决定选取顺序的函数
def random_choose(n:int)->list:
    l = list(range(n ** 3))
    for i in range(n ** 3):
        l[i] = randint(0, n-1)
    return l

def random_order(n:int)->list:
    l = list(range(n))
    shuffle(l)
    return l

def normal_order(n:int)->list:
    return list(range(n))

# 随机数据项目
# 可以获取一个数据
class data_source:
    def get_one(self):
        return None
    
    # 提供默认，但具体请根据实际情况进行优化
    def ignore(self, count=1):
        for _ in range(count):
            self.get_one()

# 自定义的函数的返回值
class call_source(data_source):
    def __init__(self, f) -> None:
        super().__init__()
        self._f = f
    def get_one(self):
        return self._f()

# 固定值
class const_source(data_source):
    def __init__(self, val) -> None:
        super().__init__()
        self._val = val
    
    def get_one(self):
        return self._val


# 根据随机方式从各个项目中选出一项
class random_item(data_source):
    def __init__(self) -> None:
        super().__init__()
        self.ready = []
        self.order = []
        self.idx = 0
        self.n = 0
        self.order_way = random_order
    
    def push_one(self, item):
        self.ready.append(item)
        self.n+=1
        self.idx = len(self.order)
    
    def push_list(self, items):
        self.ready += list(items)
        self.n += len(items)
        self.idx = len(self.order)
    
    def get_one(self):
        if self.n == 0:
            return None
        if self.idx == len(self.order):
            self.order = self.order_way(self.n)
            self.idx = 0
        self.idx += 1
        return self.ready[self.order[self.idx - 1]]
    
class classic_pulse(data_source):
    def __init__(self, start = 0, T = math.pi, pre = 0.1, power = 1.0, qT = -1.0) -> None:
        super().__init__()
        self.start = start
        self.idx = int(start / pre)
        self.T = T
        self.qT = qT if qT >= 0 else T
        self.pre = pre
        self.power = power

    def reset(self):
        self.idx = (self.start / self.pre)
    
    def get_one(self):
        pos = self.idx * self.pre
        self.idx += 1
        if pos > self.qT + self.T:
            self.idx = 0
            return 0.0
        elif pos >= self.qT:
            return self.power
        return 0.0

class classic_sin(call_source):
    def __init__(self, pre = 0.01, start = 0.0) -> None:
        self.idx = int(start / pre)
        self.pre = pre
        self.start = start

        def _f():
            v = math.sin(self.idx * self.pre)
            self.idx = self.idx +1 if self.idx + 1 < math.pi *2 / self.pre else 0
            return v
        super().__init__(_f)

    def reset(self):
        self.idx = int(self.start / self.pre)

class classic_cos(call_source):
    def __init__(self, pre = 0.01, start = 0.0) -> None:
        self.idx = int(start / pre)
        self.pre = pre
        self.start = start

        def _f():
            v = math.cos(self.idx * self.pre)
            self.idx = self.idx +1 if self.idx + 1 < math.pi *2 / self.pre else 0
            return v
        super().__init__(_f)

    def reset(self):
        self.idx = int(self.start / self.pre)

# 将随机数据格式注入
class format_general:
    def __init__(self, fstr) -> None:
        self.f = fstr

class operate_general:
    SA = 'AS'
    DM = 'MD'
    MIX = 'MIX'
    add = 'add'
    subtract = 'subtract'
    multiply = 'multiply'
    divide = 'divide'
    def __init__(self) -> None:
        self.root = None
    
    def _get_node(self):
        return self.root
    
    def create_leaf_node(self, ds, _type):
        n = node()
        if _type == operate_general.add:
            n.val =[[ds], []]
            n.sign = operate_general.SA
        elif _type == operate_general.subtract:
            n.val =[[], [ds]]
            n.sign = operate_general.SA
        elif _type == operate_general.multiply:
            n.val =[[ds], []]
            n.sign = operate_general.DM
        elif _type == operate_general.divide:
            n.val =[[], [ds]]
            n.sign = operate_general.DM
        return n
    
    def init(self, ds, _type):
        self.root = self.create_leaf_node(ds, _type)

    def compute(self):
        if self.root == None:
            return 0
        ## todo: 完善四则计算
        



# 所有的项目默认为字符，并输出到csv文件中
class csv_general:
    def __init__(self, file_path) -> None:
        self.path = file_path
        self.item = []
        self.title = []
        self.titleflag= False
    
    # 生成对应行数的随机数据
    def general_file(self, count)->bool:
        with open(self.path, 'w+') as file:

            if self.titleflag:
                title_line = ','.join(self.title)
                file.write(title_line)
                file.write('\n')
            
            for _ in range(count):
                n = len(self.item)
                l = list(range(n))
                for i in range(n):
                    if has_func(self.item[i], 'get_one'):
                        l[i] = str( self.item[i].get_one())
                    else:
                        print("the No.{} random item has'n get_one")
                file.write(','.join(l))
                file.write('\n')
            
            file.close()
        return self


    # 注册一列在内存上
    def bind_one(self, ri, title = None):
        if hasattr(ri, 'get_one'):
            if title == None:
                self.title.append('title{}'.format(len(self.item) + 1))
            else:
                self.title.append(title)
            
            self.item.append(ri)
            
            return self
        print('item has not func get_one') 
        return self
    
    def need_title(self, need:bool):
        self.titleflag = need
        return self
    
if __name__ == '__main__':
    # 示例
    r_state = random_item()
    r_count = random_item()
    r_color = random_item()

    r_state.push_list(['JP', 'KR', 'HH', 'MM', 'NN', 'Un'])
    r_state.order_way = random_choose
    r_count.push_list(list(range(1000)))
    r_count.order_way = random_choose
    r_color.push_list(['black', 'white', 'yello', 'red', 'pinck', 'blue'])
    r_color.order_way = random_choose

    gener_f = csv_general('data.csv')
    gener_f.bind_one(r_state, 'State')
    gener_f.bind_one(r_count, 'Count')
    gener_f.bind_one(r_color, 'Color')
    gener_f.need_title(True)
    gener_f.general_file(10000000)