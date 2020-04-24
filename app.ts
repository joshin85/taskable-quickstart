import { task, step, TaskableStepParameters } from 'taskable'

(async () => {
    task.run([
        new step(async ({page, store}: TaskableStepParameters) => {
            store('hello')
            await page.goto('https://news.ycombinator.com', {waitUntil: 'networkidle2'})
        }),
        new step(async ({page, store, screenshot}: TaskableStepParameters) => {
            await screenshot()
            let text: string = await page.$eval('tr .title a', (a: any) =>  a.innerText)
            store(text)
        })
    ])
})();