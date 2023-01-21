module.exports = ({ env }) => ({
  'transformer': {
    enabled: true,
    config: {
      prefix: '/api/',
      responseTransforms: {
        removeAttributesKey: true,
        removeDataKey: true,
      }
    }
  },
  'strapi-plugin-populate-deep': {
    config: {
      defaultDepth: 5, // Default is 5
    }
  },
});