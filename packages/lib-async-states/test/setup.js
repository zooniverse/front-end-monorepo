import { afterAll, beforeAll, beforeEach, describe, expect, it } from 'vitest'

global.after = afterAll
global.before = beforeAll
global.beforeEach = beforeEach
global.describe = describe
global.expect = expect
global.it = it
