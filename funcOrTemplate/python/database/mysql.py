import pymysql
import matplotlib.pyplot as plt

# 连接mysql
prop = {
    'user': 'uuser',
    'password': 'upass',
    'driver' : 'com.mysql.cj.jdbc.Driver'
}
dburl = 'dburl'
port = 3306
db = 'gameboy'
table = 'datapool'

conn = pymysql.connect(host=dburl, port=port, \
    user=prop['user'], password=prop['password'], \
        db=db)

curs = conn.cursor()

fsql = "select * from {};"

def select_and_show(db):
    sql = fsql.format(db)
    curs.execute(sql)
    results = curs.fetchall()

    l = list(map(lambda x: x[0], results))
    plt.plot(l)
    plt.show()

if __name__ == '__main__':
    select_and_show('datapool')

curs.close()
conn.close()