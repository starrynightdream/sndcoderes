# 不成熟的随机文件内容生产脚本
from random import random, randint

def has_func(obj, name):
    if hasattr(obj, name):
        val = getattr(obj, name)
        if hasattr(val, '__call__'):
            return True
    
    return False

def random_choose(n:int)->list:
    l = list(range(n ** 3))
    for i in range(n ** 3):
        l[i] = randint(0, n-1)
    return l

def random_order(n:int)->list:
    l = list(range(n))
    l.sort(lambda a,b: random() > 0.5)
    return l

def normal_order(n:int)->list:
    return list(range(n))

class random_item:
    def __init__(self) -> None:
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
    

    

# 所有的项目默认为字符，并输出到csv文件中
class random_csv:
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
    r_state = random_item()
    r_count = random_item()
    r_color = random_item()

    r_state.push_list(['JP', 'KR', 'HH', 'MM', 'NN', 'Un'])
    r_state.order_way = random_choose
    r_count.push_list(list(range(1000)))
    r_count.order_way = random_choose
    r_color.push_list(['black', 'white', 'yello', 'red', 'pinck', 'blue'])
    r_color.order_way = random_choose

    gener_f = random_csv('data.csv')
    gener_f.bind_one(r_state, 'State')
    gener_f.bind_one(r_count, 'Count')
    gener_f.bind_one(r_color, 'Color')
    gener_f.need_title(True)
    gener_f.general_file(10000000)