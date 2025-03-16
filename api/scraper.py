import requests

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


# if __name__=='__main__':
#     url = "https://www.example.com"
#     output_file = "webpage.txt"


#     download_webpage(url, output_file)
