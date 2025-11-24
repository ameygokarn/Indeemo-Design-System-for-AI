Typography tokens — simplified naming

This document describes the simplified/semantic naming added to the design system's typography scale keys in `tokens/tokens.json`.

Summary

- We added semantic alias tokens to `typography.scale.fontSize` and `typography.scale.lineHeight` to make them easier to use and read in code and token references. The numeric tokens remain for backward compatibility.

New font-size names (semantic)

- xxs  — `{scale.fontSize.xxs}` -> 8px (50)
- xs   — `{scale.fontSize.xs}`  -> 12px (75)
- sm   — `{scale.fontSize.sm}`  -> 14px (85)
- md   — `{scale.fontSize.md}`  -> 16px (100) (base)
- lg   — `{scale.fontSize.lg}`  -> 18px (110)
- xl   — `{scale.fontSize.xl}`  -> 20px (125)
- xxl  — `{scale.fontSize.xxl}` -> 22px (135)
- 3xl  — `{scale.fontSize.3xl}` -> 24px (150)
- 4xl  — `{scale.fontSize.4xl}` -> 28px (175)
- 5xl  — `{scale.fontSize.5xl}` -> 32px (200)
- 6xl  — `{scale.fontSize.6xl}` -> 34px (210)
- 7xl  — `{scale.fontSize.7xl}` -> 36px (225)

New line-height names (semantic)

- tight       — `{scale.lineHeight.tight}`        -> 16px (100)
- snug        — `{scale.lineHeight.snug}`         -> 18px (110)
- normal      — `{scale.lineHeight.normal}`       -> 20px (125)
- comfortable — `{scale.lineHeight.comfortable}`  -> 22px (135)
- relaxed     — `{scale.lineHeight.relaxed}`      -> 24px (150)
- loose       — `{scale.lineHeight.loose}`        -> 28px (175)
- extra-loose — `{scale.lineHeight.extra-loose}`  -> 32px (200)

Migration

A `migration` object was added to `typography.scale` which provides a suggested mapping from number tokens to the semantic names. Code using numeric tokens will continue to work; it is recommended to use the semantic tokens in new code.

Usage examples

- Replace `"fontSize": "{scale.fontSize.125}"` with `"fontSize": "{scale.fontSize.xl}"`.
- Replace `"lineHeight": "{scale.lineHeight.135}"` with `"lineHeight": "{scale.lineHeight.comfortable}"`.

Next steps

- If you prefer, we can standardize all existing references across tokens to use the new semantic aliases (this is optional but recommended for readability).
- Consider adding `clamp()` fluid sizes for large and responsive sizes later.

If you'd like, I can now standardize all numeric token references across the repository to use the new semantic aliases.
