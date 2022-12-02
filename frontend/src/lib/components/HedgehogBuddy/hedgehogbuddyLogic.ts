import { actions, kea, listeners, path, reducers } from 'kea'

import posthog from 'posthog-js'
import type { hedgehogbuddyLogicType } from './hedgehogbuddyLogicType'

export const hedgehogbuddyLogic = kea<hedgehogbuddyLogicType>([
    path(['hedgehog', 'hedgehogbuddyLogic']),
    actions({
        setHedgehogModeEnabled: (enabled: boolean) => ({ enabled }),
    }),

    reducers(() => ({
        hedgehogModeEnabled: [
            false as boolean,
            { persist: true },
            {
                setHedgehogModeEnabled: (_, { enabled }) => enabled,
            },
        ],
    })),

    listeners(() => ({
        setHedgehogModeEnabled: ({ enabled }) => {
            if (enabled) {
                posthog.capture('hedgehog mode enabled')
            } else {
                posthog.capture('hedgehog mode disabled')
            }
        },
    })),
])
