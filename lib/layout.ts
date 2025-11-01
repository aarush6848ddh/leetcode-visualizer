import dagre from 'dagre';
import { Position } from 'reactflow';
import type { Node, Edge } from 'reactflow';

const nodeWidth = 200;   // your card min width ~ matches Tailwind min-w-[180px]
const nodeHeight = 64;   // card height (tweak if you change padding)

export function layoutNodesEdges(
  nodes: Node[],
  edges: Edge[],
  {
    baseRankSep = 120,     // global row spacing
    deepBoost = 60,        // extra spacing for deeper rows
  } = {}
) {
  const g = new dagre.graphlib.Graph();
  g.setGraph({
    rankdir: 'TB',        // top-to-bottom
    nodesep: 30,          // tighter spacing between nodes within a row
    ranksep: baseRankSep, // base spacing between rows
    edgesep: 30,
  });
  g.setDefaultEdgeLabel(() => ({}));

  // Needed so dagre knows each node's box
  nodes.forEach((n) => {
    g.setNode(n.id, { width: nodeWidth, height: nodeHeight });
  });
  
  edges.forEach((e) => {
    // Only add edge if both nodes exist
    if (g.hasNode(e.source) && g.hasNode(e.target)) {
      g.setEdge(e.source, e.target);
    }
  });

  // Only layout if we have nodes and edges
  if (nodes.length > 0) {
    dagre.layout(g);
  }

  // find deepest rank so we can pad the bottom rows a bit more
  const ranks = new Map<string, number>();
  g.nodes().forEach((id) => {
    const n = g.node(id) as any;
    if (n && typeof n.rank === 'number') {
      ranks.set(id, n.rank);
    } else {
      ranks.set(id, 0);
    }
  });

  const rankValues = Array.from(ranks.values());
  const maxRank = rankValues.length > 0 ? Math.max(...rankValues) : 0;

  const laidOutNodes = nodes.map((n, index) => {
    const dn = g.node(n.id) as any;
    const rank = ranks.get(n.id) ?? 0;
    // add extra spacing to deeper levels so the bottom isn't crowded
    const extra = Math.max(0, rank - (maxRank - 2)) * deepBoost; // boost last 2 ranks

    // Ensure we have valid positions from dagre
    // If dagre didn't provide positions (e.g., isolated nodes), use fallback spacing
    let x = 0;
    let y = 0;
    
    if (dn && typeof dn.x === 'number' && typeof dn.y === 'number' && !isNaN(dn.x) && !isNaN(dn.y)) {
      x = dn.x - nodeWidth / 2;
      y = dn.y - nodeHeight / 2 + extra;
    } else {
      // Fallback: arrange isolated nodes in a simple grid
      x = (index % 5) * (nodeWidth + 40);
      y = Math.floor(index / 5) * (nodeHeight + baseRankSep);
    }

    return {
      ...n,
      position: { x, y },
      sourcePosition: Position.Bottom,
      targetPosition: Position.Top,
      draggable: false,
    };
  });

  return { nodes: laidOutNodes, edges };
}

