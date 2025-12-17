# Guidelines for Design Tokens

## General Rules
1.  **Strict Token Structure**:
    *   **Brand (Foundation)**: Contains static values (`color`, `spacing`, `modifier`, `typography`).
    *   **Semantic**: Contains context-specific tokens (usually colors) referencing foundation tokens.
    *   **Viewport**: Contains tokens that scale based on viewport size (`grid`, `typography.fontSize`, `spacing`).
    *   **Styles**: Composite tokens referencing foundation and viewport tokens.

## Referencing Rules
1.  **Implicit Paths**: When referencing tokens, assume the context of active themes. Do not hardcode set names unless necessary for disambiguation (which should be rare in this architecture).
    *   **Correct**: `{typography.fontFamily.a}`, `{color.brand.pink}`.
    *   **Incorrect**: `{brand.typography.fontFamily.a}` (unless `brand` structure requires it), `{viewport/medium.typography...}`.
2.  **Viewport Scaling**: Always reference generic typography/spacing paths in `styles`. The active viewport theme will provide the correct value.
    *   **Correct**: `{typography.fontSize.lg}`
    *   **Incorrect**: `{viewport/large.typography.fontSize.lg}`

## Formatting Rules
1.  **Descriptions**: The `description` field MUST be a property of the token object itself, NOT a sibling token.
    *   **Correct**:
        ```json
        "tokenName": {
          "value": "...",
          "type": "...",
          "description": "This is a description."
        }
        ```
    *   **Incorrect**:
        ```json
        "tokenName": { "value": "...", "type": "..." },
        "description": { "value": "This is a description.", "type": "other" }
        ```
2.  **No Duplicate Tokens**: Ensure tokens are defined only once in their respective sets.

## Investigation & Recovery
If mistakes occur:
1.  **Analyze**: Check `tokens/tokens.json` structure against these guidelines.
2.  **Document**: Record the error and the fix in `investigate-mistakes.md`.
3.  **Fix**: Apply corrections using `replace_in_file` carefully.
4.  **Verify**: Ensure no regression in other parts of the file.
