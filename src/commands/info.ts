import { Command, command, metadata } from 'clime'
import * as fs from 'fs'
import * as path from 'path'

@command({
    brief: 'Display version information',
})
export default class extends Command {
    @metadata
    async execute(): Promise<void> {
        try {
            const packageJsonPath = path.resolve(
                __dirname,
                '../../package.json'
            )

            const rawData = fs.readFileSync(packageJsonPath, 'utf8')

            const packageData = JSON.parse(rawData)

            console.log(`Version: ${packageData.version}`)
        } catch (error) {
            console.error(
                'An error occurred while fetching version information:',
                error
            )
        }
    }
}
