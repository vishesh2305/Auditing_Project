import React from 'react';
import { Shield, Zap, BookOpen } from 'lucide-react';

const ScoreCard = ({ title, score, icon }) => {
    const getScoreColor = (s) => {
        if (s >= 8) return 'text-green-600';
        if (s >= 5) return 'text-yellow-600';
        return 'text-red-600';
    };

    return (
        <div className="flex-1 p-4 bg-gray-50 rounded-lg text-center border">
            <div className="flex items-center justify-center gap-2 text-gray-600">
                {icon}
                <h4 className="font-semibold">{title}</h4>
            </div>
            <p className={`text-5xl font-bold mt-2 ${getScoreColor(score)}`}>
                {score}
            </p>
            <p className="text-xs text-gray-500">out of 10</p>
        </div>
    );
};


const ScoreDisplay = ({ title, scores }) => {
    if (!scores) return null;

    const { securityScore, performanceScore, readabilityScore } = scores;

    return (
        <div className="p-4 rounded-lg bg-white shadow-md">
            <h3 className="text-xl font-bold text-gray-800 mb-4">{title}</h3>
            <div className="flex gap-4">
                <ScoreCard title="Security" score={securityScore} icon={<Shield />} />
                <ScoreCard title="Performance" score={performanceScore} icon={<Zap />} />
                <ScoreCard title="Readability" score={readabilityScore} icon={<BookOpen />} />
            </div>
        </div>
    );
};

export default ScoreDisplay;