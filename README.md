# CCM GenAI GFX Cards & Approval Process - Prototype

This is a functional prototype demonstrating the GenAI GFX Cards & Approval Process feature for the CCM (Campaign & Content Management) Pizza Tracker page.

## Features

### 1. Pizza Tracker View
- Language-by-language view of asset progress
- Shows sub-stages: Origination, Pre-QC Assembly, QC, Versioning & Encoding
- Real-time status updates for each language

### 2. GenAI GFX Generation
- **"Generate GenAI GFX Cards"** button on the Pizza Tracker
- Select specific languages or generate for all languages
- Async generation with status tracking:
  - Not Started
  - Queued
  - Generating
  - Completed
  - Failed
  - Needs Review
  - Approved
  - Rejected

### 3. Review & Approval Workflow
- **Human-in-the-loop review** - all GenAI content must be reviewed
- Table view showing all generated cards with:
  - Thumbnail previews (large enough to read text)
  - Language information
  - Status indicators
  - Approve/Reject actions

### 4. Full Preview & Editing
- Click any thumbnail for full-screen preview
- Edit prompt and regenerate cards
- Side-by-side view of card and prompt editor
- Real-time regeneration

### 5. Delivery Confirmation
- Explicit confirmation required before delivery to VanDAM
- Only approved cards can be delivered
- Safety warnings and checklist

## Technology Stack

- **React 18** with TypeScript
- **Vite** for fast development and building
- **Tailwind CSS** for styling
- **Lucide React** for icons
- Mock GenAI service with simulated async generation

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

The app will be available at `http://localhost:5173`

### Build

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## User Workflows

### Workflow 1: Generate GFX Cards for All Languages
1. Click "Generate GenAI GFX Cards"
2. Confirm language selection (all selected by default)
3. Click "Generate X Card(s)"
4. Watch real-time status updates per language
5. When complete, click "Review & Approve GFX Cards"

### Workflow 2: Review & Approve Cards
1. View all generated cards in table format
2. Click thumbnails for full preview
3. Edit prompts and regenerate if needed
4. Approve cards individually
5. When all approved, click "Deliver to VanDAM"
6. Confirm delivery

### Workflow 3: Edit & Regenerate a Card
1. From review table, click "Edit & Regenerate" or click thumbnail
2. Modify the prompt in the editor
3. Click "Regenerate"
4. Wait for new version (2-5 seconds)
5. Approve when satisfied

## Key Design Decisions

### Human-in-the-Loop Principle
All GenAI-generated content requires explicit human approval before delivery. This is enforced through:
- "Needs Review" status after generation
- Mandatory review workflow
- Explicit approve action per card
- Final confirmation before VanDAM delivery

### Async Generation with Status Tracking
- Generation happens asynchronously to prevent UI blocking
- Clear status indicators at language level
- Real-time updates (simulated with 2-5 second delays)
- Partial success allowed (some languages can succeed while others fail)

### Table UX for Review
- Thumbnails large enough to read text on GFX cards
- Quick approve/reject actions
- Click-through to full preview
- Progress tracking (X of Y approved)

## Mock Data

The prototype includes:
- Campaign: "Hell's Paradise: Jigokuraku: Season 2"
- 4 Languages: Chinese (Traditional), English, Japanese, Thai
- Simulated GFX generation (2-5 second delay)
- Placeholder images with campaign title in each language

## Future Enhancements (Out of Scope for Prototype)

- Fully automated delivery without human approval
- Advanced analytics on reviewer behavior
- Cross-campaign bulk review
- Custom prompt templates per language
- Version comparison
- Quality scoring
- Localization QA tools

## Testing Notes

This is a prototype for user testing. Key aspects to validate:
- ✅ Usability of trigger button placement
- ✅ Clarity of generation status
- ✅ Effectiveness of review workflow
- ✅ Confidence in approving GenAI content
- ✅ Prompt editing experience
- ✅ Delivery confirmation flow

## Author

Christopher Rodriguez

## License

Prototype for internal testing only.
