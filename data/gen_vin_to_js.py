import pandas as pd
import json
from pathlib import Path

def excel_to_json(excel_file: str, out_file: str = None):
    excel_path = Path(excel_file)
    out_path = Path(out_file) if out_file else excel_path.with_suffix('.js')

    # skiprows=1 把真正的第 0 行（Excel 第 1 行）直接跳过
    sheets = pd.read_excel(
        excel_path,
        sheet_name=None,
        header=None,
        skiprows=1,        # 跳过第 0 行
        usecols=[0, 1]
    )

    out = {}
    for name, df in sheets.items():
        df = df.dropna(how='all')          # 去掉全空行
        keys = df.iloc[:, 0].astype(str)
        vals = df.iloc[:, 1].astype(str)
        out[name] = dict(zip(keys, vals))
    json_str = json.dumps(out, ensure_ascii=False, indent=2)
    js_str = "module.exports =" + json_str
    out_path.write_text(js_str, encoding='utf-8')
    
    print('done ->', out_path)

if __name__ == '__main__':
    excel_to_json('VIN码管理总表.xlsx')