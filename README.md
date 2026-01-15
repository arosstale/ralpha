# Ralph - Autonomous Claude Coding Loop

Ralph is a bash script that runs Claude Code in an autonomous loop, working through tasks in your PRD until everything is complete.

## Prerequisites

- [Claude Code CLI](https://github.com/anthropics/claude-code) installed and authenticated
- `jq` for JSON parsing
- `bc` for cost calculation (optional, for cost estimates)

## Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/ralphy.git
   cd ralphy
   ```

2. Make the script executable:
   ```bash
   chmod +x ralphy.sh
   ```

3. Create a `PRD.md` file in your project directory with tasks formatted as:
   ```markdown
   # My Project PRD

   ## Tasks
   - [ ] Implement user authentication
   - [ ] Add dashboard page
   - [ ] Create API endpoints
   ```

## Usage

Run Ralph from your project directory:

```bash
./ralphy.sh
```

Ralph will:
1. Find the next incomplete task (`- [ ]`) in your PRD.md
2. Implement the feature
3. Write and run tests
4. Run linting
5. Update PRD.md to mark the task complete (`- [x]`)
6. Log progress to progress.txt
7. Commit the changes
8. Repeat until all tasks are done

## Flags

| Flag | Description |
|------|-------------|
| `--no-tests` | Skip writing and running tests |
| `--no-lint` | Skip linting |
| `--fast` | Skip both tests and linting |
| `-h, --help` | Show help message |

### Examples

```bash
# Full mode with tests and linting
./ralphy.sh

# Skip tests only
./ralphy.sh --no-tests

# Skip linting only
./ralphy.sh --no-lint

# Fast mode - skip both tests and linting
./ralphy.sh --fast
```

## Required Files

| File | Required | Description |
|------|----------|-------------|
| `PRD.md` | Yes | Your product requirements with checkbox tasks |
| `progress.txt` | No | Created automatically if missing; logs progress |

## Features

- **Progress indicator**: Shows current step (Reading code, Implementing, Writing tests, Linting, Committing, etc.) with elapsed time
- **Token tracking**: Displays input/output tokens and estimated cost at completion
- **Auto-cleanup**: Gracefully handles interrupts (Ctrl+C)
- **Completion sound**: Plays a notification sound when done (macOS)
- **Error recovery**: Continues to next iteration on API errors

## How It Works

Ralph uses Claude Code's `--dangerously-skip-permissions` flag to run autonomously without confirmation prompts. Each iteration:

1. Reads your PRD.md and progress.txt for context
2. Identifies the highest-priority incomplete task
3. Implements the feature with tests and linting (unless skipped)
4. Marks the task complete and commits
5. Outputs `<promise>COMPLETE</promise>` when all tasks are done

## Cost Tracking

At completion, Ralph displays:
- Total input tokens
- Total output tokens
- Estimated cost (based on Claude API pricing)

## Tips

- Keep PRD tasks small and focused for best results
- Use `--fast` for rapid prototyping, then run tests separately
- Check `progress.txt` for a log of what was done
- Press Ctrl+C to stop gracefully at any time

## License

MIT
