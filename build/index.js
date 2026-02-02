"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mcp_js_1 = require("@modelcontextprotocol/sdk/server/mcp.js");
const stdio_js_1 = require("@modelcontextprotocol/sdk/server/stdio.js");
const zod_1 = require("zod");
const server = new mcp_js_1.McpServer({
    name: "weather",
    version: "1.0.0",
});
server.registerTool("add two numbers", {
    description: "Add two numbers together",
    inputSchema: zod_1.z.object({
        a: zod_1.z.number().describe("First number to add"),
        b: zod_1.z.number().describe("Second number to add"),
    }),
}, async (args) => {
    return new Promise((resolve) => {
        resolve({
            content: [
                {
                    type: "text",
                    text: `Sum of a and b are : ${args.a + args.b}`,
                },
            ],
        });
    });
});
async function main() {
    const transport = new stdio_js_1.StdioServerTransport();
    await server.connect(transport);
    console.error("Weather MCP Server running on stdio");
}
main().catch((error) => {
    console.error("Fatal error in main():", error);
    process.exit(1);
});
