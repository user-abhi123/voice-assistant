import datetime
import pytz

def process_command(command):
    command = command.lower()

    if "open youtube" in command:
        return "trigger_open_youtube"
    elif "open google" in command:
        return "trigger_open_google"
    elif "search" in command:
        query = command.split("search", 1)[-1].strip()
        return f"trigger_search:{query}"
    elif "time" in command:
        india_tz = pytz.timezone('Asia/Kolkata')
        now = datetime.datetime.now(india_tz)
        return now.strftime("It's %I:%M %p on %A, %d %B %Y")
    else:
        return "I'm not sure how to help with that yet."