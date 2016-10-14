const Chance = require('chance')
const priorityLevels = require('./priorityLevels')
const request = require('superagent-es6-promise')

const chance = new Chance()

const task_arr = [['Finish 4261 project', 'Complete a usable todo list app for android and web', ['Finish backend', 'Finish frontend web', 'Finish frontend Android']],
    ['Do calculus homework', 'Finish all assigned homework from chapters 1 and 2', ['Finish Chapter 1 - Derivatives', 'Finish Chapter 1 - Integrals', 'Finish Chapter 2 - Graphing']],
    ['Study for job interviews', 'Study for interview with google', ['Study Algorithms', 'Study data structures', 'Study dynamic programming']],
    ['Cook meals for the week', 'Cook and freeze lunch and dinner for the upcoming week', ['Cook lunch', 'Freeze lunch', 'Cook dinner', 'Freeze dinner']],
    ['Do laundry', 'Wash and dry all clothes', ['Wash clothes', 'Dry clothes', 'Fold clothes']],
    ['Write machine learning essay', 'Write essay on Bayesian networks', ['Write introduction', 'Write body', 'Write Conclusion']],
    ['Walk dog', 'Walk Dodo around the neighborhood', []]]

const user_arr = ['joseph', 'iris', 'nate', 'sufyan', 'justin', 'mostafa']

const due_date_arr = [new Date("2016-10-23T10:00:00").getTime(), new Date("2016-10-23T14:00:00").getTime(),
    new Date("2016-10-24T06:45:00").getTime(), new Date("2016-10-31T20:30:00").getTime(), new Date("2016-11-24T12:00:00").getTime(),
    new Date("2016-12-25T13:15:30").getTime(), new Date("2016-01-01T00:00:00").getTime()];

const status = {
    complete:'COMPLETE',
    incomplete:'INCOMPLETE',
    archived:'ARCHIVED'
};

const status_arr = ['COMPLETE', 'INCOMPLETE'];

function createUsers() {
    const users = []
    for(let i = 0; i < user_arr.length; i++){
        const newUser = {
            u_id: chance.guid(),            
            email: user_arr[i] + '@test.com',
            password: 'test'
        }
        users.push(newUser)
    }
    return users
}

const newUsers = createUsers()
const priorities = [priorityLevels.HIGH, priorityLevels.MEDIUM, priorityLevels.LOW]
const statuses = ["COMPLETE", "INCOMPLETE", "ARCHIVED"]

function createTasks() {
    const tasks = []
    for (let i = 0; i < task_arr.length; i++) {            
        const newTask = {
            t_id: chance.guid(),
            name: task_arr[i][0],
            description: task_arr[i][1],                
            subtasks: task_arr[i][2],
            category: 'test',
            indexInList: i,
            priority: chance.pickone(priorities),
            dateDue: chance.pickone(due_date_arr),
            user: chance.pickone(newUsers).u_id,
            status: chance.pickone(statuses)
        }
        tasks.push(newTask)
    } 
    return tasks
}

const newTasks = createTasks()

for(let i = 0; i < newUsers.length; i++) {
    request.post('ec2-54-158-62-69.compute-1.amazonaws.com:3000/api/user/create')
        .send(newUsers[i])
        .set('Accept', 'application/json')
        .then((res) => console.log(res))
        
}

for (let i = 0; i < newTasks.length; i++) {
    request.post('ec2-54-158-62-69.compute-1.amazonaws.com:3000/api/task/create')
        .send(newTasks[i])
        .set('Accept', 'application/json')
        .then((res) => console.log(res))
}