import glob
import pandas as pd
import xml.etree.ElementTree as ET
import os
def xml_to_csv(path):
    xml_list = []
    for xml_file in glob.glob(path + '/P0****.xml'):#改为自己xml文件命名格式
        print('/////////////////////////////////////')
        print(xml_file)
        tree = ET.parse(xml_file)
        root = tree.getroot()
        for member in root.findall('object'):
            value = (root.find('filename').text,
                     int(root.find('size')[0].text),
                     int(root.find('size')[1].text),
                     member[0].text,
                     float(member[4][0].text),
                     float(member[4][1].text),
                     float(member[4][2].text),
                     float(member[4][3].text)
                     )
            xml_list.append(value)
    column_name = ['filename', 'width', 'height', 'class', 'xmin', 'ymin', 'xmax', 'ymax']  # 改为自己的列名
    xml_df = pd.DataFrame(xml_list, columns=column_name)
    #print('----------------')
    #print(xml_df)
    return xml_df



if __name__ == "__main__":
    xml_path = 'C:/Users/wxk/Desktop/Annotation'  # 改为自己的xml文件所在文件夹路径
    print(os.path.exists(xml_path))
    xml_df = xml_to_csv(xml_path)
    print('**********************************')
    print(xml_df)
    xml_df.to_csv('C:/Users/wxk/Desktop/Annotation/labels.csv', index=None)  # 改为自己csv存储路径
    print('Successfully converted xml to csv.')