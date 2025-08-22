// Sample JavaScript code for testing flowchart generation
function calculateGrade(score) {
    if (score >= 90) {
        return 'A';
    } else if (score >= 80) {
        return 'B';
    } else if (score >= 70) {
        return 'C';
    } else if (score >= 60) {
        return 'D';
    } else {
        return 'F';
    }
}

function processStudentGrades(students) {
    const results = [];
    
    for (const student of students) {
        const grade = calculateGrade(student.score);
        const result = {
            name: student.name,
            score: student.score,
            grade: grade,
            status: grade === 'F' ? 'Fail' : 'Pass'
        };
        results.push(result);
    }
    
    return results;
}

// Example usage
const students = [
    { name: 'Alice', score: 95 },
    { name: 'Bob', score: 82 },
    { name: 'Charlie', score: 78 },
    { name: 'David', score: 65 },
    { name: 'Eva', score: 55 }
];

const processedGrades = processStudentGrades(students);
console.log('Processed Grades:', processedGrades);

// Additional function for sequence diagram testing
class Classroom {
    constructor(teacher) {
        this.teacher = teacher;
        this.students = [];
    }
    
    addStudent(student) {
        this.students.push(student);
    }
    
    conductClass() {
        this.teacher.greet();
        
        for (const student of this.students) {
            student.respond();
        }
        
        this.teacher.teach();
        return "Class completed successfully";
    }
}

class Teacher {
    constructor(name) {
        this.name = name;
    }
    
    greet() {
        console.log(`Hello class, I'm ${this.name}`);
    }
    
    teach() {
        console.log("Teaching the lesson...");
    }
}

class Student {
    constructor(name) {
        this.name = name;
    }
    
    respond() {
        console.log(`${this.name}: Present!`);
    }
}
