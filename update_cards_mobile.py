import os

files_to_update = [
    'c:/Users/asus/Desktop/office/git 2/git 2/about.html',
    'c:/Users/asus/Desktop/office/git 2/git 2/neet-preparation.html',
    'c:/Users/asus/Desktop/office/git 2/git 2/iit-jee-preparation.html',
    'c:/Users/asus/Desktop/office/git 2/git 2/foundation-preparation.html',
    'c:/Users/asus/Desktop/office/git 2/git 2/entrance-preparation.html'
]

old_str = '<div class="col-lg-3 col-md-4 col-sm-6 col-10 mb-4">'
new_str = '<div class="col-lg-3 col-md-4 col-sm-6 col-6 mb-3 px-2">' # using col-6 for mobile, reduced bottom margin and added horizontal padding classes so it fits nicely on mobile

for file_path in files_to_update:
    with open(file_path, 'r', encoding='utf-8') as file:
        file_content = file.read()
    
    # replace
    if old_str in file_content:
        file_content = file_content.replace(old_str, new_str)
        with open(file_path, 'w', encoding='utf-8') as file:
            file.write(file_content)
        print(f"Updated {file_path}")
    else:
        print(f"String not found in {file_path}")

