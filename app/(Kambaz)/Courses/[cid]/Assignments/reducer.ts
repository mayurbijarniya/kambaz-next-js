import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { assignments as initialAssignments } from "../../../Database";

export type Assignment = {
  _id: string;
  title: string;
  course: string;
  availableOn?: string | null;
  dueOn?: string | null;
  availableUntil?: string | null;
  points?: number | null;
  description?: string | null;
  editing?: boolean;
};

export type AssignmentDraft = Partial<Omit<Assignment, "_id">> & {
  course: string;
};

type AssignmentsState = {
  assignments: Assignment[];
};

const initialState: AssignmentsState = {
  assignments: initialAssignments as Assignment[],
};

const assignmentsSlice = createSlice({
  name: "assignments",
  initialState,
  reducers: {
    addAssignment: (state, { payload }: PayloadAction<AssignmentDraft>) => {
      const courseNumber = payload.course.substring(2); 
      const courseLastDigit = courseNumber.charAt(2); 
      
      const existingIdsForCourse = state.assignments
        .filter((a) => {
          const id = a._id;
          return id.startsWith("A") && id.length === 4 && id.charAt(1) === courseLastDigit;
        })
        .map((a) => parseInt(a._id.substring(1)))
        .sort((a, b) => b - a); 
      
      const baseNumber = parseInt(`${courseLastDigit}00`); 
      const nextNumber = (existingIdsForCourse[0] || baseNumber) + 1;
      const newId = `A${nextNumber}`;

      const newAssignment: Assignment = {
        _id: newId,
        title: payload.title ?? "New Assignment",
        course: payload.course,
        availableOn: payload.availableOn ?? null,
        dueOn: payload.dueOn ?? null,
        availableUntil: payload.availableUntil ?? null,
        points: payload.points ?? 0,
        description: payload.description ?? "",
        editing: true,
      };

      state.assignments = [...state.assignments, newAssignment];
    },
    deleteAssignment: (state, { payload: assignmentId }: PayloadAction<string>) => {
      state.assignments = state.assignments.filter(
        (assignment) => assignment._id !== assignmentId
      );
    },
    updateAssignment: (state, { payload }: PayloadAction<Assignment>) => {
      state.assignments = state.assignments.map((assignment) =>
        assignment._id === payload._id ? { ...payload } : assignment
      );
    },
    editAssignment: (state, { payload: assignmentId }: PayloadAction<string>) => {
      state.assignments = state.assignments.map((assignment) =>
        assignment._id === assignmentId
          ? { ...assignment, editing: true }
          : assignment
      );
    },
    cancelEditAssignment: (state, { payload: assignmentId }: PayloadAction<string>) => {
      state.assignments = state.assignments.map((assignment) =>
        assignment._id === assignmentId
          ? { ...assignment, editing: false }
          : assignment
      );
    },
  },
});

export const {
  addAssignment,
  deleteAssignment,
  updateAssignment,
  editAssignment,
  cancelEditAssignment,
} = assignmentsSlice.actions;

export default assignmentsSlice.reducer;
