# Obsidian to Anki Flashcards Exporter

This plugin allows you to create Anki flashcards directly from your Obsidian notes and export them in a format compatible with Anki's import feature.

## Features

- Create flashcards within your Obsidian notes using a simple syntax
- Export flashcards to a dedicated `anki_cards` folder
- Convert markdown files to txt format for Anki compatibility
- Support for markdown headers in flashcard content

## How to Use

### Creating Flashcards

In any Obsidian note, create flashcards using this format:

```markdown
What's your question? #flashcard
This is the answer

You can have multiple lines in the answer
And even format it


The next flashcard should start after TWO empty lines
```

You can also use markdown headers in your flashcards:

```markdown
# What is the capital of France? #flashcard
Paris is the capital of France

## Who wrote Hamlet? #flashcard
William Shakespeare wrote Hamlet
```

### Exporting Flashcards

1. Open the note containing your flashcards
2. Open the command palette (Ctrl/Cmd + P)
3. Run the command "Export current note to anki folder"
4. The cards will be exported to the `anki_cards` folder in your vault

### Converting to TXT Format

Important: Anki doesn't accept .md files for import. You need to convert the exported file to .txt format:

1. Navigate to the `anki_cards` folder in your vault
2. Open the exported flashcard file
3. Open the command palette (Ctrl/Cmd + P)
4. Run the command "Convert current file to txt"
5. A new .txt file will be created in the same folder

Note: The txt file won't be visible in the Obsidian editor, but you can see it in your file explorer. This is normal behavior as Obsidian is designed to work with markdown files.

### Importing to Anki

1. Open Anki
2. Click "Import File"
3. Select the .txt file you created
4. Make sure to:
   - Set the delimiter to Tab
   - Check that "Allow HTML in fields" is enabled
   - Select the appropriate note type and field mapping

## Card Format

- Front of card: Everything before #flashcard
- Back of card: All text between the #flashcard line and two consecutive empty lines
- Cards are separated by two empty lines
- HTML line breaks (<br>) are automatically added between lines on the back of the card

## Tips

- Always convert your exported files to .txt before importing to Anki
- Use markdown headers (#, ##, etc.) freely - they'll be properly processed
- Make sure to end each card with two empty lines to properly separate them
- Check the `anki_cards` folder in your vault for your exported files

## Troubleshooting

If you don't see your cards in Anki after import:
1. Ensure you converted the file to .txt format
2. Verify the file contains content by checking it in your system's file explorer
3. Make sure you're using the correct delimiter (Tab) in Anki's import settings

If no cards are being exported:
1. Verify your cards end with #flashcard
2. Check that you have two empty lines between cards (_sometimes adding two lines before the line with #flashcard will help)
3. Make sure you're running the export command on a file that contains flashcards
