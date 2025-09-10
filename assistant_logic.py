import datetime
import psutil
import webbrowser
import urllib.parse

def process_command(command):
    command = command.lower()

    if "time" in command:
        return f"The time is {datetime.datetime.now().strftime('%H:%M')}"
    elif "date" in command:
        return f"Today is {datetime.datetime.now().strftime('%A, %d %B %Y')}"
    elif "battery" in command:
        battery = psutil.sensors_battery()
        return f"Battery is at {battery.percent}%"
    elif "cpu" in command:
        return f"CPU usage is at {psutil.cpu_percent()}%"
    elif "hello" in command:
        return "Hello Abhishek! How can I assist you today?"
    elif "open youtube" in command:
        webbrowser.open("https://www.youtube.com")
        return "Opening YouTube"
    elif "open google" in command:
        webbrowser.open("https://www.google.com")
        return "Opening Google"
    elif "open gmail" in command:
        webbrowser.open("https://mail.google.com")
        return "Opening Gmail"
    elif "search" in command:
        query = command.replace("search for", "").strip()
        if query:
            webbrowser.open(f"https://www.google.com/search?q={urllib.parse.quote(query)}")
            return f"Searching Google for {query}"
        else:
            return "Please say what you want to search for."
    elif "play" in command and "on youtube" in command:
        query = command.replace("play", "").replace("on youtube", "").strip()
        if query:
            search_url = f"https://www.youtube.com/results?search_query={urllib.parse.quote(query)}"
            webbrowser.open(search_url)
            return f"Playing {query} on YouTube"
        else:
            return "Please say the name of the video you want to play."
    else:
        return "Sorry, I didn’t understand that command."