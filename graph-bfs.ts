class Queue<T> extends Array<T> {

  public enqueue(item: T): void {

    this.push(item);

  }

  public dequeue(): T | undefined {

    return this.shift();

  }

  public isEmpty(): boolean {

    return (0 === this.length);

  }

}

class Graph {

  private vertices: number;
  private adjacencyList: Array<Array<number>>;

  public constructor(vertices: number) {

    this.vertices = vertices;
    this.adjacencyList = [...new Array(this.vertices)].map(() => []);

  }

  public addEdge(vertex: number, edge: number): void {

    this.adjacencyList[vertex].push(edge);

  }

  // A BFS based search
  public isReachable(startVertex: number, endVertex: number): boolean {

    if (startVertex === endVertex) {

      return true;

    }

    // Mark all vertices as not visited
    const visited = new Array(this.vertices);
    visited.fill(false);

    const queue = new Queue<number>();

    // Mark the current vertex as visited
    visited[startVertex] = true;
    // Enqueue the current vertex
    queue.enqueue(startVertex);

    while (!queue.isEmpty()) {

      const currentNode = queue.dequeue();

      if (currentNode === endVertex) {

        return true;

      }

      for (const adjacent of this.adjacencyList[currentNode!]) {

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

} else {

  console.log('There is not a path');

}

if (graph.isReachable(3, 1)) {

  console.log('There is a path');

} else {

  console.log('There is not a path');

}
