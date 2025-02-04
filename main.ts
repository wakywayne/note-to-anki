import { App, Editor, MarkdownView, Plugin, TFile, Notice } from "obsidian";

interface AnkiCard {
	front: string;
	back: string[];
}
export default class AnkiExportPlugin extends Plugin {
	private ankiFolder: string = "anki_cards";
	async onload() {
		this.addCommand({
			id: "export-to-anki-folder",
			name: "Export current note to anki folder",
			callback: async () => {
				await this.exportCurrentNoteToAnkiFolder();
			},
		});

		this.addCommand({
			id: "convert-to-txt",
			name: "Convert current file to txt",
			callback: async () => {
				await this.convertCurrentFileToTxt();
			},
		});
	}

	private async convertCurrentFileToTxt() {
		const activeView = this.app.workspace.getActiveViewOfType(MarkdownView);
		if (!activeView) {
			new Notice("No active markdown file");
			return;
		}

		const file = activeView.file;
		if (!file) {
			new Notice("No active file");
			return;
		}

		const content = await this.app.vault.read(file);
		const txtFileName = `${file.basename}.txt`;
		const txtFilePath =
			file.parent !== null && file.parent !== undefined
				? `${file.parent.path}/${txtFileName}`
				: new Error("File parent is null or undefined");

		try {
			if (typeof txtFilePath === "string") {
				await this.app.vault.create(txtFilePath, content);
				new Notice(`File converted to ${txtFileName}`);
			} else if (txtFilePath instanceof Error) {
				throw txtFilePath;
			} else {
				throw new Error(
					"The file.parent is not null or undefined, but another exception has accured",
				);
			}
		} catch (error) {
			new Notice("Failed to convert file to txt");
			console.error(error);
		}
	}

	private async ensureAnkiFolder() {
		const folderPath = this.ankiFolder;
		const folder = this.app.vault.getAbstractFileByPath(folderPath);
		if (!folder) {
			await this.app.vault.createFolder(folderPath);
		}
	}

	private async exportCurrentNoteToAnkiFolder() {
		const activeView = this.app.workspace.getActiveViewOfType(MarkdownView);
		if (!activeView) {
			new Notice("No active markdown file");
			return;
		}

		const file = activeView.file;
		if (!file) {
			new Notice("No active file");
			return;
		}
		const content = await this.app.vault.read(file);
		const cards = this.parseFlashcards(content);

		if (cards.length === 0) {
			new Notice("No flashcards found in the current note");
			return;
		}

		await this.ensureAnkiFolder();
		const exportFileName = `${file.basename}_anki.md`;
		const exportFilePath = `${this.ankiFolder}/${exportFileName}`;

		const ankiContent = this.formatAnkiCards(cards);

		try {
			await this.app.vault.create(exportFilePath, ankiContent);
			new Notice(`Anki cards exported to ${exportFilePath}`);
		} catch (error) {
			new Notice("Failed to export Anki cards");
			console.error(error);
		}
	}

	private parseFlashcards(content: string): AnkiCard[] {
		const lines = content.split("\n");
		const cards: AnkiCard[] = [];
		let currentCard: AnkiCard | null = null;
		let emptyLineCount = 0;

		for (let i = 0; i < lines.length; i++) {
			const line = lines[i].trim();

			if (line.endsWith("#flashcard")) {
				// If we find a new card front, save the previous card if it exists
				if (currentCard) {
					cards.push(currentCard);
				}

				// Start a new card
				let frontText = line.replace("#flashcard", "").trim();
				// Handle markdown headers by removing leading #s and their trailing space
				frontText = frontText.replace(/^#{1,6}\s+/, "");
				// Start a new card
				currentCard = {
					front: frontText,
					back: [],
				};
				emptyLineCount = 0;
			} else if (currentCard) {
				if (line === "") {
					emptyLineCount++;
					// Two consecutive empty lines mark the end of the card
					if (emptyLineCount === 2) {
						cards.push(currentCard);
						currentCard = null;
						emptyLineCount = 0;
					}
				} else {
					// Reset empty line count when we encounter non-empty line
					emptyLineCount = 0;
					// Add non-empty lines to the back of the current card
					currentCard.back.push(line);
				}
			}
		}

		// Don't forget to add the last card if it exists
		if (currentCard) {
			cards.push(currentCard);
		}

		return cards;
	}

	private formatAnkiCards(cards: AnkiCard[]): string {
		return cards
			.map((card) => {
				const back = card.back.join("<br>");
				console.log({
					card,
					back,
					result: `${card.front};${back}`,
				});
				return `${card.front};${back}`;
			})
			.join("\n");
	}
}
