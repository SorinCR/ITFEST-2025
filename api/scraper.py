import requests

# scrape for 1 webpage

def cooler_remover(page):
    result=[]
    buf=0
    state_script=False
    state_body=True

    for i in page:
        #print(state_script,state_body,buf)
        if state_script==False and state_body:
            result.append(i)

        j=ord(i)
        if j>127:
            buf=0
        else:
            if j==60:
                buf=60
            elif buf!=0:
                buf=buf*128+j
                if buf==267860976498804: #<script
                    print("<script")
                    buf=0
                    state_script=True
                    if state_body:
                        for _ in range(7):
                                if len(result):
                                    result.pop(-1)
                if buf==4350423497873046078: #</script>
                    print("</script>")
                    buf=0
                    state_script=False
                if buf==16313479801: #<body
                    print("<body")
                    buf=0
                    state_body=True 
                if buf==265524239482046: #</body>
                    print("</body>")
                    for _ in range(7):
                        result.pop(-1)
                    return ''.join(result)
                if j==62 or buf>4350423497873046078:
                    buf=0
    print("None found")
    return ''.join(result)

            
        

        



def extract_body(page):
    a=page.find('<body') #intentionat nu am inchis cu > pt ca sa detectez si body cu parametrii
    b=page.find('</body>')

    return page[a:b]

def remove_scripts(page):
    result=page
    a=result.find('<script')
    b=result.find('</script>')
    while a!=-1:
        result=result[0:a]+result[(b+9):len(result)]
        a=result.find('<script')
        b=result.find('</script>')
    
    return result

        

def download_webpage(url, output_file):
    try:
        response = requests.get(url)
        response.raise_for_status()  # Raise an error for bad status codes
        
        with open(output_file, 'w', encoding='utf-8') as file:
            file.write(response.text)
        
        print(f"Webpage saved to {output_file}")
    except requests.exceptions.RequestException as e:
        print(f"Error downloading the webpage: {e}")


def text_webpage(url):
    try:
        response = requests.get(url)
        response.raise_for_status()  # Raise an error for bad status codes
        return response.text
    except requests.exceptions.RequestException as e:
        print(f"Error downloading the webpage: {e}")


# Example usage


if __name__=='__main__':
    url = "https://www.uvt.ro"
    output_file = "webpage.txt"

    print(cooler_remover(text_webpage(url)))

    #download_webpage(url, output_file)
