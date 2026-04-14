import re

files_to_update = [
    'c:/Users/asus/Desktop/office/git 2/git 2/about.html',
    'c:/Users/asus/Desktop/office/git 2/git 2/neet-preparation.html',
    'c:/Users/asus/Desktop/office/git 2/git 2/iit-jee-preparation.html',
    'c:/Users/asus/Desktop/office/git 2/git 2/foundation-preparation.html',
    'c:/Users/asus/Desktop/office/git 2/git 2/entrance-preparation.html'
]

mapping = {
    'SARFARAZ MALIK': 'SarfarazMalik.jpg',
    'AGRIM SINGHAL': 'AgrimSinghal.jpg',
    'MAYANK TIWARI': 'MayankTiwari.jpg',
    'LUV YADAV': 'LuvYadav.jpg',
    'MOHD. MUMTAZ': 'MohdMumtaz.jpg',
    'SAIMA KHAN': 'SaimaKhan.jpg', # Assuming this will be added or we just update the ref
    'DANISH AHMAD': 'DanishAhmad.jpg',
    'AKBAR KAMAL': 'AkbarKamal.jpg',
    'AFSAHUL HUDA': 'AfsarulHuda.jpg', # Using the user's spelling "Afsarul"
    'NIKHIL YADAV': 'NikhilYadav.jpg',
    'SUBHAN RAZA': 'SubhanRaza.jpg'
}

for filepath in files_to_update:
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # The HTML block looks like:
    # <div class="team-img-wrap"><img src="..." alt="SARFARAZ MALIK" class="img-fluid"></div>
    # Let's replace the src based on the alt text.

    for name, img_name in mapping.items():
        # Match the whole <img> tag with this exact alt text, and capture prefix/suffix
        # e.g.: <img src="assets/images/faculty/62.jpg" alt="SARFARAZ MALIK" class="img-fluid">
        pattern = re.compile(rf'(<img src="assets/images/faculty/)([^"]+)(" alt="{re.escape(name)}" class="img-fluid">)')
        
        # Replacement function to keep prefix/suffix but change the filename
        def replace_src(match):
            return f'{match.group(1)}{img_name}{match.group(3)}'
            
        content = pattern.sub(replace_src, content)

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)
        
    print(f"Updated {filepath}")
