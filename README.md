# Obsidian to Anki Flashcards Exporter

This plugin allows you to create Anki flashcards directly from your Obsidian notes and export them in a format compatible with Anki's import feature.

## Features

-   Create flashcards within your Obsidian notes using a simple syntax
    > this is the front of the card #flashcard
    > this is the back of the card \n \n
-   Export flashcard file to a dedicated `anki_cards` folder
-   Seperate `convert file to txt` command to convert markdown files to txt format for Anki compatibility
-   Removes markdown headers when making flashcards
-   Able to make shortcuts for both commands in plugin configuration settings

## How to Use

### Creating Flashcards

In any Obsidian note, create flashcards using this format:

```markdown
What's your question? #flashcard
This is the answer

You can have multiple lines in the answer
And even format it


The next flashcard should start after **TWO** empty lines
```

### Exporting Flashcards

1. Open the note containing your flashcards
2. Open the command palette (Ctrl/Cmd + P)
3. Run the command "Export current note to anki folder"
4. The cards will be exported to the `anki_cards` folder in your vault

### Converting to TXT Format

# Important: 
*Anki doesn't accept .md files for import. You need to convert the exported file to .txt format:*

1. Navigate to the `anki_cards` folder in your vault
2. Open the exported flashcard file
3. Open the command palette (Ctrl/Cmd + P)
4. Run the command "Convert current file to txt"
5. A new .txt file will be created in the same folder

**Important Note**: The txt file won't be visible in the Obsidian editor, but you can see it in your file explorer. This is normal behavior as Obsidian is designed to work with markdown (.md) files not text (.txt) files.

### Importing to Anki

1. Open Anki
2. Click "File" in the top left on pc > "Import File"
3. Select the .txt file you created
4. Make sure to:
    - Set the delimiter to Semi-colon (_will almost definitely be this by default_)
    - Check that "Allow HTML in fields" is enabled
    - Select the appropriate note type and field mapping
	- Add any tags that you want to be added to the cards

# Still not 100% sure?

## Card Format

-   Front of card: Everything before #flashcard
-   Back of card: All text between the #flashcard line and two consecutive empty lines
-   Cards are separated by two empty lines
-   HTML line breaks (<br>) are automatically added between lines on the back of the card

## Tips

-   Always convert your exported files to .txt before importing to Anki
-   Make sure to end each card with two empty lines to properly separate them
-   Check the `anki_cards` folder in your vault for your exported files

## Troubleshooting

If you don't see your cards in Anki after import:

1. Ensure you converted the file to .txt format
2. Verify the file contains content by checking it in your system's file explorer
3. Make sure you're using the correct delimiter (**;**) in Anki's import settings

If no cards are being exported:

1. Verify your front of card is on 1 line and ends with #flashcard
2. Check that you have two empty lines between cards (_sometimes adding two lines before the line with #flashcard will help_)
3. Make sure you're running the export command on the correct file
