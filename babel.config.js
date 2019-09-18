module.exports = {
  "presets": [
    [
      "@babel/preset-env",
      {
        "useBuiltIns": false
      }
    ],
    "@babel/typescript",
    "@babel/preset-react"
  ],
  "plugins": [
    "@babel/proposal-class-properties",
    "@babel/proposal-object-rest-spread"
  ]
}
