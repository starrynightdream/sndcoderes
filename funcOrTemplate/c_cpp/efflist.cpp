
#include <algorithm>
#include "./efflist.h"
using namespace std;
using namespace sndcoderes;

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
    for (auto iter = _remqueue.begin(); iter!=_remqueue.end(); ++iter)
    {
        if (num <= *iter)
        {
            int idx = iter - _remqueue.begin();
            _remqueue.insert(iter, num);
            if (idx <= _index) ++_index;

            if (idx > 0 && *iter - *(iter-1) < _minDis)
            {
                _minDis = *iter - *(iter-1);
                _index = idx;
            }
            if (idx < _remqueue.size() - 1 && *(iter+1) - *(iter) < _minDis)
            {
                _minDis = *(iter+1) - *(iter);
                _index = idx;
            }
            return ;
        }
    }

    _remqueue.push_back(num);
    int n = _remqueue.size();
    if (n == 2 || n >2 && _remqueue[n-1] - _remqueue[n-2] < _minDis)
    {
        _minDis = _remqueue[n-1] - _remqueue[n-2];
        _index = n-2;
    }
}

template<class T>
bool UpCountList<T>::rmnum(T num)
{
    for (auto iter = _remqueue.begin(); iter != _remqueue.end(); ++iter)
    {
        if (*iter == num)
        {
            int idx = iter - _remqueue.begin();
            _remqueue.earse(iter, iter+1);
            if (idx == _index || idx == _index + 1)
            {
                int n = _remqueue.size();
                if (n < 2)
                    _index = -1;
                else
                {
                    int d = _remqueue[1] - _remqueue[0];
                    for (auto iter = _remqueue.begin() + 2; iter != _remqueue.end(); ++iter)
                        d = min<T>(d, *iter - *(iter - 1));
                }
            }
            return true;
        }
    }
    return false;
}