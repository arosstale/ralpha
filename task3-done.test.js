// Test to verify task3-done.txt was created correctly
import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";

const testFilePath = resolve(process.cwd(), "task3-done.txt");

// Test 1: File exists
if (!existsSync(testFilePath)) {
	console.error("❌ Test failed: task3-done.txt does not exist");
	process.exit(1);
}
console.log("✓ Test passed: task3-done.txt exists");

// Test 2: File has correct content
const content = readFileSync(testFilePath, "utf-8").trim();
const expectedContent = "All tasks completed successfully";

if (content !== expectedContent) {
	console.error("❌ Test failed: Content mismatch");
	console.error(`  Expected: "${expectedContent}"`);
	console.error(`  Got: "${content}"`);
	process.exit(1);
}
console.log("✓ Test passed: Content is correct");

console.log("\n✅ All tests passed!");
