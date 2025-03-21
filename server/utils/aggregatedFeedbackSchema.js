export const aggregatedAssignmentFeedbackSchema = {
    name: "AggregatedAssignmentFeedback",
    strict: true,
    schema: {
        type: "object",
        description: "Schema for aggregated AI feedback across multiple student submissions.",
        additionalProperties: false,
        properties: {
            // common problems
            commonProblems: {
                type: "array",
                description: "List of the most commonly encountered problems or low-scoring areas among students.",
                items: {
                    type: "object",
                    additionalProperties: false,
                    properties: {
                        problemName: {
                            type: "string",
                            description: "Name or identifier for the problem/requirement area.",
                        },
                        description: {
                            type: "string",
                            description: "Brief explanation of the nature of this problem.",
                        },
                        occurrences: {
                            type: "integer",
                            description: "Number of students affected by this particular issue.",
                        },

                        recommendedActions: {
                            type: "array",
                            description: "Actions or suggestions to fix or improve this problem.",
                            items: {
                                type: "string"
                            },
                        },
                    },
                    required: [
                        "problemName",
                        "description",
                        "occurrences",
                        "recommendedActions",
                    ],
                },
            },
            //   strong areas
            strongAreas: {
                type: "array",
                description: "List of areas or requirements most students performed well in.",
                items: {
                    type: "object",
                    additionalProperties: false,
                    properties: {
                        areaName: {
                            type: "string",
                            description: "Name of the requirement or topic students excelled in.",
                        },
                        description: {
                            type: "string",
                            description: "Brief explanation of this strong area.",
                        },
                    },
                    required: ["areaName", "description"],
                },
            },
            overallLecturerSuggestions: {
                type: "array",
                description: "General suggestions or feedback for the lecturer based on the student submissions.",
                items: {
                    type: "string"
                },
            },
            additionalNotes: {
                type: "string",
                description: "Any additional observations or free-form notes that do not fit neatly into the above categories.",
            },
        },
        required: [
            "commonProblems",
            "strongAreas",
            "overallLecturerSuggestions",
            "additionalNotes",
        ],
    },
};
