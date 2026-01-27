"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CheckCircle, Circle, Plus, X, Target } from "lucide-react";

interface Goal {
  id: string;
  text: string;
  completed: boolean;
}

export function SprintGoals() {
  const [goals, setGoals] = useState<Goal[]>([
    { id: "1", text: "Ship CI/CD v2.1 update", completed: true },
    { id: "2", text: "Close 3 enterprise deals", completed: false },
    { id: "3", text: "Hire senior backend engineer", completed: false },
  ]);
  const [newGoal, setNewGoal] = useState("");
  const [adding, setAdding] = useState(false);

  const toggleGoal = (id: string) => {
    setGoals(goals.map((g) => (g.id === id ? { ...g, completed: !g.completed } : g)));
  };

  const addGoal = () => {
    if (!newGoal.trim()) return;
    setGoals([...goals, { id: Date.now().toString(), text: newGoal, completed: false }]);
    setNewGoal("");
    setAdding(false);
  };

  const removeGoal = (id: string) => {
    setGoals(goals.filter((g) => g.id !== id));
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base flex items-center gap-2">
            <Target className="h-4 w-4" />
            Sprint Goals
          </CardTitle>
          <Button variant="ghost" size="sm" onClick={() => setAdding(true)}>
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {goals.map((goal) => (
            <div
              key={goal.id}
              className="flex items-center gap-2 group"
            >
              <button onClick={() => toggleGoal(goal.id)} className="shrink-0">
                {goal.completed ? (
                  <CheckCircle className="h-4 w-4 text-emerald-500" />
                ) : (
                  <Circle className="h-4 w-4 text-muted-foreground" />
                )}
              </button>
              <span
                className={`text-sm flex-1 ${
                  goal.completed ? "line-through text-muted-foreground" : ""
                }`}
              >
                {goal.text}
              </span>
              <button
                onClick={() => removeGoal(goal.id)}
                className="opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <X className="h-3 w-3 text-muted-foreground hover:text-foreground" />
              </button>
            </div>
          ))}
          {adding && (
            <div className="flex items-center gap-2">
              <Input
                placeholder="Add a goal..."
                value={newGoal}
                onChange={(e) => setNewGoal(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && addGoal()}
                autoFocus
                className="h-8 text-sm"
              />
              <Button size="sm" onClick={addGoal} className="h-8">
                Add
              </Button>
              <Button size="sm" variant="ghost" onClick={() => setAdding(false)} className="h-8">
                <X className="h-3 w-3" />
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
