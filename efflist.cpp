#include "./efflist.h"
using namespace sndcoderes;
using namespace std;

template<class T>
T UpCountList<T>::getminDes()
{
    if (_index < 0) throw "还没有出现距离，请添加至少两个元素后再进行距离获取";
    else return _minDis;
}

template<class T>
int UpCountList<T>::getminPos()
{
    return _index;
}

template<class T>
void UpCountList<T>::adnum(T num)
{

}

template<class T>
void UpCountList<T>::rmnum(T num)
{

}