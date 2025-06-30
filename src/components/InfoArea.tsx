interface InfoAreaProps {
  lineCount: number;
  characterCount: number;
}

export function InfoArea(
  { lineCount, characterCount }: InfoAreaProps,
) {
  return (
    <div className="h-full bg-base-100 md:p-4 overflow-auto">
      <div className="space-y-4">
        <div>
          <h4 className="font-medium mb-2">Document Stats</h4>
          <div className="text-sm space-y-1 [&_span:last-child]:font-mono">
            <div className="flex justify-between">
              <span>Lines:</span>
              <span>{lineCount}</span>
            </div>
            <div className="flex justify-between">
              <span>Characters:</span>
              <span>{characterCount}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
