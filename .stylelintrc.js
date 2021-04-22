module.exports = {
    plugins: ['stylelint-scss'],
    rules: {
        'at-rule-no-unknown': [null],
        'color-no-invalid-hex': true,
        'font-family-no-duplicate-names': true,
        'function-calc-no-unspaced-operator': true,
        'function-linear-gradient-no-nonstandard-direction': true,
        'string-no-newline': true,
        'unit-no-unknown': true,
        'property-no-unknown': true,
        'keyframe-declaration-no-important': true,
        'declaration-block-no-duplicate-properties': [
            true,
            {
                ignore: ['consecutive-duplicates-with-different-values']
            }
        ],
        'declaration-block-no-shorthand-property-overrides': true,
        'block-no-empty': true,
        'selector-pseudo-class-no-unknown': true,
        'selector-pseudo-element-no-unknown': true,
        'selector-type-no-unknown': true,
        'media-feature-name-no-unknown': true,
        'comment-no-empty': true,
        'no-descending-specificity': true,
        'no-duplicate-selectors': true,
        'no-empty-source': true,
        'no-extra-semicolons': true,
        'no-invalid-double-slash-comments': true,
        'shorthand-property-no-redundant-values': true,
        'value-no-vendor-prefix': true,
        'property-no-vendor-prefix': true,
        'declaration-block-no-redundant-longhand-properties': true,
        'declaration-no-important': true,
        'selector-no-vendor-prefix': true,
        'media-feature-name-no-vendor-prefix': true,
        'at-rule-no-vendor-prefix': true,
        'max-nesting-depth': [
            3,
            {
                ignore: ['blockless-at-rules']
            }
        ],
        'no-unknown-animations': true,
        'declaration-property-value-allowed-list': {
            '/color$/': ['/^\\$|initial|inherit|transparent|currentColor|darken|lighten|rgba/'],
            fill: ['/^\\$|initial|inherit|transparent|currentColor|darken|lighten|rgba/'],
            stroke: ['/^\\$|initial|inherit|transparent|currentColor|darken|lighten|rgba/']
        },
        'scss/at-extend-no-missing-placeholder': true,
        'scss/at-rule-no-unknown': true,
        'scss/media-feature-value-dollar-variable': 'always',
        'scss/selector-no-redundant-nesting-selector': true
    }
};
