export interface NumbersPanelProps {
    value: number,
}

export interface MinefieldItem {
    isCovered: boolean;
    isMine: boolean;
    isQuestionMark: boolean;
    isMarkedAsMine: boolean;
    mineNeigbhorsCount: number;
}

export enum MinefieldValue {
    covered,
    flag,
    mine,
    question,
    empty,
}

