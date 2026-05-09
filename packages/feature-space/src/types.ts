export interface ContentFeatureVector {
  speechSpeed: number
  lexicalNovelty: number
  grammarDensity: number
  subtitleDependency: number
  visualContextStrength: number
  emotionalIntensity: number
  narrativeDependency: number
  sceneComplexity: number
  accentDistance: number
  abstractionLevel: number
}

export interface UserProfileVector {
  speedTolerance: number
  vocabularyBreadth: number
  grammarFamiliarity: number
  subtitleReliance: number
  contextInference: number
  emotionalReceptivity: number
  narrativeFollowing: number
  sceneProcessing: number
  accentAdaptability: number
  abstractionCapacity: number
}

export interface FeatureWeights {
  speechSpeed: number
  lexicalNovelty: number
  grammarDensity: number
  subtitleDependency: number
  visualContextStrength: number
  emotionalIntensity: number
  narrativeDependency: number
  sceneComplexity: number
  accentDistance: number
  abstractionLevel: number
}

export interface IPlusOneZone {
  minComprehension: number
  maxComprehension: number
  maxCognitiveLoad: number
  minNovelty: number
  maxNovelty: number
}

export interface ContentCandidate {
  id: string
  features: ContentFeatureVector
  iPlusOneScore: number
  distance: number
}

export interface DimensionInteraction {
  compensating: [keyof ContentFeatureVector, keyof ContentFeatureVector][]
  reinforcing: [keyof ContentFeatureVector, keyof ContentFeatureVector][]
}
