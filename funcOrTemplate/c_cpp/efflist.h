#ifndef __EFFLIST__

#define __EFFLIST__
// 实现的有用的列表

#include <vector>
using namespace std;

namespace sndcoderes
{
    template<class T>
    T abs(T a, T b)
    {
        if (a^b >= 0)
            return a > b? a-b: b-a;
        else
            return a > b? a-b: b-a;
    }

    /**
     * 内部是一个升序数组
    * 维护最小距离
    * 确保二者之间定义了 '+/-' 运算
    */
    template<class T>
    class UpCountList
    {
    private:
        T _minDis;
        int _index;
    public:
        vector<T> _remqueue;
        UpCountList(const vector<T> & nums, int k =-1)
        :_index(-1)
        {
            if (k<0) 
                for(T item: nums) adnum(nums);
            else
                for (int i=0; i<k; i++) adnum(nums[i]);
        }
        /**
        * 返回数列中距离最小的两者的距离
        */
        T getminDes(){}

        /**
        * 返回数组中距离最小的两者中小者的下标，大者的下标为其加一
        */
        int getminPos(){}

        /**
        * 向数组中添加一个数值
        */
        void adnum(T num){}

        /**
        * 从数值中移除一个数值
        */
        bool rmnum(T num){}

        /**
        * 替换掉数组中的旧值并添加一个新值
        */
        void replace(T oldN, T newN)
        {
            rmnum(oldN);adnum(newN);
        }
    };
} // namespace sndcoderes

#endif // __EFFLIST__