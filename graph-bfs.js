class Queue extends Array {
    enqueue(item) {
        this.push(item);
    }
    dequeue() {
        return this.shift();
    }
    isEmpty() {
        return (0 === this.length);
    }
}
class Graph {
    vertices;
    adjacencyList;
    constructor(vertices) {
        this.vertices = vertices;
        this.adjacencyList = [...new Array(this.vertices)].map(() => []);
    }
    addEdge(vertex, edge) {
        this.adjacencyList[vertex].push(edge);
    }
    // A BFS based search
    isReachable(startVertex, endVertex) {
        if (startVertex === endVertex) {
            return true;
        }
        // Mark all vertices as not visited
        const visited = new Array(this.vertices);
        visited.fill(false);
        const queue = new Queue();
        // Mark the current vertex as visited
        visited[startVertex] = true;
        // Enqueue the current vertex
        queue.enqueue(startVertex);
        while (!queue.isEmpty()) {
            const currentNode = queue.dequeue();
            if (currentNode === endVertex) {
                return true;
            }
            for (const adjacent of this.adjacencyList[currentNode]) {
                if (!visited[adjacent]) {
                    visited[adjacent] = true;
                    queue.push(adjacent);
                }
            }
        }
        return false;
    }
}
const graph = new Graph(4);
graph.addEdge(0, 1);
graph.addEdge(0, 2);
graph.addEdge(1, 2);
graph.addEdge(2, 0);
graph.addEdge(2, 3);
graph.addEdge(3, 3);
if (graph.isReachable(1, 3)) {
    console.log('There is a path');
}
else {
    console.log('There is not a path');
}
if (graph.isReachable(3, 1)) {
    console.log('There is a path');
}
else {
    console.log('There is not a path');
}
