'use client';

import { useMemo, useEffect } from 'react';
import ReactFlow, {
  Background,
  BackgroundVariant,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
  Position,
  Handle,
  Node,
  Edge,
  ReactFlowProvider,
} from 'reactflow';
import 'reactflow/dist/style.css';
import { Topic } from '@/types';
import Link from 'next/link';
import { layoutNodesEdges } from '@/lib/layout';

interface RoadmapTreeProps {
  topics: Topic[];
}

// NeetCode-style node component
function RoadmapNode({ data }: any) {
  const { topic, progress, solvedCount, totalCount } = data;
  const isComplete = totalCount > 0 && solvedCount === totalCount;

  return (
    <Link href={`/topics/${topic.id}`} className="block">
      <div className="relative select-none">
        <div
          className="
            bg-green-800
            text-white font-semibold
            px-6 py-2
            rounded-lg
            shadow-[0_4px_15px_rgba(0,0,0,0.3)]
            flex flex-col items-center justify-center
            min-w-[180px]
            hover:brightness-110 transition
            cursor-pointer
          "
        >
          <span className="text-base">{topic.name}</span>
          {totalCount > 0 && progress > 0 ? (
            <div className="mt-2 h-[10px] w-[85%] rounded-full bg-[#d9d9d9] overflow-hidden">
              <div
                className={`h-full rounded-full ${
                  isComplete
                    ? 'bg-green-500'
                    : 'bg-green-500/80'
                }`}
                style={{ width: `${progress}%` }}
              />
            </div>
          ) : (
            <div className="mt-2 h-[10px] w-[85%] rounded-full bg-[#d9d9d9]" />
          )}
        </div>
        <Handle
          type="target"
          position={Position.Top}
          className="!bg-white w-2 h-2 -mt-1"
        />
        <Handle
          type="source"
          position={Position.Bottom}
          className="!bg-white w-2 h-2 -mb-1"
        />
      </div>
    </Link>
  );
}

const nodeTypes = { roadmap: RoadmapNode };

// Helper to create a node quickly
const createNode = (
  id: string,
  topic: Topic,
  solvedCount: number,
  totalCount: number
): Node => ({
  id,
  type: 'roadmap',
  data: {
    topic,
    progress: totalCount > 0 ? (solvedCount / totalCount) * 100 : 0,
    solvedCount,
    totalCount,
  },
  position: { x: 0, y: 0 }, // Will be set by layout
  draggable: false,
});

// Edges helper
const createEdge = (id: string, from: string, to: string): Edge => ({
  id,
  source: from,
  target: to,
  type: 'smoothstep',
  animated: false,
  style: { stroke: '#ffffff88', strokeWidth: 1 },
});

export default function RoadmapTree({ topics }: RoadmapTreeProps) {
  // Build topic map and progress map
  const topicMap = useMemo(() => {
    const map = new Map<string, Topic>();
    topics.forEach(topic => map.set(topic.id, topic));
    return map;
  }, [topics]);

  const progressMap = useMemo(() => {
    const map = new Map<string, { solved: number; total: number }>();
    topics.forEach(topic => {
      const solved = topic.problems.filter(p => p.status === 'solved').length;
      const total = topic.problems.length;
      map.set(topic.id, { solved, total });
    });
    return map;
  }, [topics]);

  // Create base nodes and edges, then apply dagre layout
  const initialNodesAndEdges = useMemo(() => {
    const createdNodes: Node[] = [];
    topics.forEach(topic => {
      const progress = progressMap.get(topic.id) || { solved: 0, total: 0 };
      createdNodes.push(createNode(topic.id, topic, progress.solved, progress.total));
    });

    // Create edges based on prerequisites
    const createdEdges: Edge[] = [];
    topics.forEach(topic => {
      if (topic.prerequisites && topic.prerequisites.length > 0) {
        topic.prerequisites.forEach(prereq => {
          // Check if both nodes exist
          const sourceExists = topics.some(t => t.id === prereq);
          const targetExists = topics.some(t => t.id === topic.id);
          if (sourceExists && targetExists) {
            createdEdges.push(createEdge(`${prereq}-${topic.id}`, prereq, topic.id));
          }
        });
      }
    });

    // Apply dagre layout to automatically space nodes
    const { nodes: laidOutNodes, edges: laidOutEdges } = layoutNodesEdges(
      createdNodes,
      createdEdges,
      {
        baseRankSep: 90,  // tighter spacing between rows
        deepBoost: 40,    // less extra spacing for deeper rows
      }
    );

    return { nodes: laidOutNodes, edges: laidOutEdges };
  }, [topics, progressMap]);

  const [reactFlowNodes, setNodes, onNodesChange] = useNodesState(initialNodesAndEdges.nodes);
  const [reactFlowEdges, setEdges, onEdgesChange] = useEdgesState(initialNodesAndEdges.edges);

  // Update nodes and edges when topics change
  useEffect(() => {
    setNodes(initialNodesAndEdges.nodes);
    setEdges(initialNodesAndEdges.edges);
  }, [initialNodesAndEdges, setNodes, setEdges]);

  const allProblems = useMemo(() => {
    return topics.flatMap(topic => topic.problems);
  }, [topics]);

  const solvedCount = allProblems.filter(p => p.status === 'solved').length;
  const totalCount = allProblems.length;

  return (
    <ReactFlowProvider>
      <div className="w-full h-full bg-[#0F1115] overflow-hidden">
        <div className="w-full h-full relative">
          <ReactFlow
          nodes={reactFlowNodes}
          edges={reactFlowEdges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          nodeTypes={nodeTypes}
          fitView
          fitViewOptions={{ padding: 0.2 }}
          defaultEdgeOptions={{ type: 'smoothstep' }}
          panOnScroll
          zoomOnDoubleClick={false}
          className="bg-[#0F1115]"
        >
          <MiniMap
            pannable
            zoomable
            className="!bg-transparent border border-white/10 rounded-lg"
            nodeColor="#15803d"
            maskColor="rgba(0, 0, 0, 0.6)"
          />
          <Controls className="bg-white/5 border border-white/10 rounded-lg" />
          <Background
            id="dots"
            variant={BackgroundVariant.Dots}
            gap={24}
            size={1}
            color="#1f2430"
          />
        </ReactFlow>
      </div>
    </div>
    </ReactFlowProvider>
  );
}
