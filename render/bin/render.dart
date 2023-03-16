import 'dart:io';

import 'package:markdown/markdown.dart';

void main(List<String> arguments) {
  if (arguments.length != 1) {
    print('Usage: render <file>');
    return;
  }

  final inPath = arguments[0];
  final outPath = inPath.replaceAll('.md', '.html');

  final file = File(inPath);
  if (!file.existsSync()) {
    print('File not found: ${file.path}');
    return;
  }
  final markdown = file.readAsStringSync();
  final document = Document(
    extensionSet: ExtensionSet.gitHubWeb,
  );

  final nodes = document.parse(markdown);

  final content = '${renderToHtml(nodes)}\n';
  final outFile = File(outPath);

  final templatePath = 'TEMPLATE.html';
  final templateFile = File(templatePath);
  final template = templateFile.readAsStringSync();

  final html = template.replaceAll('{{content}}', content);
  outFile.writeAsStringSync(html);
}
