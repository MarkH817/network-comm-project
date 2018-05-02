/**
 * A promise that resolves after an event loop turn completes.
 * https://nodejs.org/api/process.html#process_process_nexttick_callback_args
 */
const queueTask = () =>
  new Promise(resolve => {
    process.nextTick(resolve)
  })

module.exports = {
  queueTask
}
