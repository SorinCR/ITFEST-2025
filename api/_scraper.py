import requests

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

    print(remove_scripts(extract_body(text_webpage(url))))

    #download_webpage(url, output_file)
